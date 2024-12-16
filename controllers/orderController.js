const Order = require('../models/orderModel');
const Discount = require('../models/discountModel');
const catchAsync = require('../util/catchAsync');
const appError = require('../util/appError');
const Product = require('../models/productModel');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const cc = require('currency-converter-lt');

exports.createSession = catchAsync(async (req, res, next) => {
  //create order
  let discount;
  if (req.body.appliedDiscount) {
    discount = await Discount.findOne({
      _id: req.body.appliedDiscount,
      validUntil: { $gte: Date.now() },
    });
    if (!discount)
      return next(new appError('there is no discount available', 400));
    if (req.user.usedPromo.includes(req.body.appliedDiscount)) {
      return next(new appError('you already used this discount', 400));
    } else {
      req.user.usedPromo.push(discount._id);
      let user = req.user;
      await user.save({ validateBeforeSave: false });
    }
  }
  let order = await Order.create({
    productsDetails: req.body.productsDetails,
    user: req.user._id,
    status: 'pending payment',
    paymentType: req.body.paymentType,
    appliedDiscount: req.body.appliedDiscount || undefined,
  });

  order = (await order.populate('productsDetails.product')).toObject();
  const products = await Promise.all(
    order.productsDetails.map(async (item) => {
      const price = Math.round(
        await new cc({
          from: 'EGP',
          to: 'AED',
          amount: item.price,
        }).convert()
      );
      return {
        tax_rates: ['txr_1QWkOQFMOzFwL4Tk7U1mD6Tp'],
        quantity: parseInt(item.quantity),
        price_data: {
          unit_amount: price * 100,
          currency: 'aed',
          product_data: {
            name: item.product.name,
            description: item.product.description,
            images: [
              `${req.protocol}://${req.get('host')}/product-pics/${
                item.product.photo
              }`,
            ],
          },
        },
      };
    })
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourID}&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/`,
    customer_email: req.user.email,
    client_reference_id: order._id.toString(),
    mode: 'payment',
    line_items: products,
    discounts: discount ? [{ coupon: discount.discountCode }] : undefined,
    shipping_options: [{ shipping_rate: 'shr_1QWkNcFMOzFwL4TkLoUmFkW5' }],
  });
  res.status(200).json({ status: 'success', data: { session } });
});

exports.webhookSession = async (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK
    );
  } catch (err) {
    res.status(400).send(`Webhook error : ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const order = await Order.findById(event.data.object.client_reference_id);
    order.status = 'received';
    await order.save({ validateBeforeSave: false });
  }
  res.status(200).json({ received: true });
};

exports.createOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create({
    user: req.user._id,
    productsDetails: req.body.productsDetails,
  });
  console.log(req.body);
  res.status(200).json({
    status: 'success',
    data: { order },
  });
});

exports.getUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    result: orders.length,
    data: { orders },
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    status: 'success',
    result: orders.length,
    data: { orders },
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    // result: orders.length,
    // data: { orders },
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.user.toString() !== req.user._id.toString())
    return next(
      new appError('you do not permission to access this order'),
      403
    );
  res.status(200).json({
    status: 'success',
    // result: orders.length,
    data: { order },
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id, status: { $not: { $eq: 'refunded' } } },
    {
      status: req.body.status,
    }
  );
  if (!order)
    return next(new appError("you can't update a refunded order"), 400);
  if (req.body.status === 'refunded') {
    await Promise.all(
      order.productsDetails.map((el) => {
        return Product.findByIdAndUpdate(el.product, {
          $inc: { quantity: el.quantity },
        });
      })
    );
  }
  res.status(200).json({
    status: 'success',
    data: { order },
  });
});

exports.bestSeller = async (brandId) => {
  const id = new mongoose.Types.ObjectId(brandId);
  const best = await Order.aggregate([
    // select only completed orders
    { $match: { status: { $not: { $eq: 'refunded' } } } },
    // make document for each products
    { $unwind: '$productsDetails' },
    // group by product and calculate the total sales
    {
      $group: {
        _id: '$productsDetails.product',
        totalSales: { $sum: '$productsDetails.quantity' },
      },
    },
    // get product detail for each product
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    // remove the array
    { $unwind: '$product' },
    // { $addFields: { brandId: '$product.brandId' } },
    {
      $match: {
        'product.brandId': id,
      },
    },
    // sort the aggregate for total sales
    {
      $sort: {
        totalSales: -1,
      },
    },
    // remove id from row
    { $project: { _id: 0 } },
  ]);
  return best;
};
