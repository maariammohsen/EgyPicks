const appError = require('../util/appError');
const Discount = require('../models/discountModel');
const catchAsync = require('../util/catchAsync');
const userModel = require('../models/userModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
exports.promocode = catchAsync(async (req, res, next) => {
  const promo = await Discount.findOne({
    discountCode: req.body.discountCode,
    validUntil: { $gte: Date.now() },
  });
  if (!promo) {
    return next(
      new appError(
        "Can't find a matching promocode! please insert a valid one!",
        404
      )
    );
  }
  if (req.user.usedPromo.includes(promo._id)) {
    return next(
      new appError(
        'This promocode is already used! please insert a valid one!',
        404
      )
    );
  }
  res.status(200).json({
    status: 'success',
    data: { promo },
  });
});
exports.createDiscount = catchAsync(async (req, res, next) => {
  const newDiscount = await Discount.create(req.body);
  const coupon = await stripe.coupons.create({
    name: newDiscount.discountCode,
    id: newDiscount.discountCode,
    percent_off: newDiscount.discountPercentage,
    duration: 'once',
  });
  res.status(201).json({
    status: 'success',
    data: { newDiscount },
  });
});

exports.getAllDiscounts = catchAsync(async (req, res, next) => {
  const discounts = await Discount.find();
  res.status(200).json({
    status: 'success',
    data: { discounts },
  });
});

exports.getDiscount = catchAsync(async (req, res, next) => {
  const discount = await Discount.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: { discount },
  });
});

exports.deleteDiscount = catchAsync(async (req, res, next) => {
  const ByeDisco = await Discount.findByIdAndDelete(req.params.id);
  if (!ByeDisco) {
    return next(appError("OOPS!Can't find a discount with that id", 404));
  }
  await stripe.coupons.del(ByeDisco.discountCode);
  res.status(204).json({
    status: 'success',
  });
});
