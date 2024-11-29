const Brand = require('../models/brandModel');
const appError = require('../util/appError');
const catchAsync = require('../util/catchAsync');

exports.getAllBrands = catchAsync(async (req, res, next) => {
  const Brands = await Brand.find();
  res.status(200).json({
    status: 'Success!',
    result: Brands.length,
    data: Brands,
  });
});

exports.getBrand = catchAsync(async (req, res, next) => {
  const myBrand = await Brand.findById(req.params.id).populate({
    path: 'products',
    select: 'name image price discountPrice quantity',
  });
  if (!myBrand) {
    return next(new appError('Brand is not found!', 404));
  }
  res.status(200).json({
    status: 'Success!',
    data: myBrand,
  });
});

exports.createBrand = catchAsync(async (req, res, next) => {
  const newBrand = await Brand.create(req.body);
  res.status(200).json({
    status: 'Success!',
    data: newBrand,
  });
});

exports.updateBrand = catchAsync(async (req, res, next) => {
  const brandFresh = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!brandFresh) {
    return next(new appError('Cant find user with a matched ID', 404));
  }
  res.status(200).json({
    status: 'Success!',
    data: brandFresh,
  });
});

exports.deleteBrand = catchAsync(async (req, res, next) => {
  const deletedBrand = await User.findByIdAndDelete(req.params.id);
  if (!deletedBrand) {
    return next(new appError('user is not existed', 404));
  }
  res.status(200).json({
    status: 'Success!',
    message: 'Brand is deleted successfully!',
  });
});
