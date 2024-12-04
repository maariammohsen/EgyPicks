const Order = require('../models/orderModel');
const catchAsync = require('../util/catchAsync');
const appError = require('../util/appError');
const Product = require('../models/productModel');
exports.createOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create({
    user: req.user._id,
    productsDetails: req.body.productsDetails,
  });

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
  if (order.user.toString() !== req.user_id.toString())
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

  exports.bestSeller = catchAsync(async (req, res, next) => {});
  res.status(200).json({
    status: 'success',
    data: { order },
  });
});
