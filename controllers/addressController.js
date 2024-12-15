const Address = require('../models/addressModel');
const catchAsync = require('../util/catchAsync');
const appError = require('../util/appError');

exports.createAddress = catchAsync(async (req, res, next) => {
  const address = await Address.create(req.body);
  res.status(200).json({
    status: 'Success!',
    data: address,
  });
});

exports.updateAddress = catchAsync(async (req, res, next) => {
  const newAddress = await Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!newAddress) {
    return next(new appError('Cant find an address with a matched ID', 404));
  }

  res.status(200).json({
    status: 'Success!',
    data: newAddress,
  });
});

exports.getAllAddresses = catchAsync(async (req, res, next) => {
  const addresses = await Address.find();
  res.status(200).json({
    status: 'Success!',
    result: addresses.length,
    data: addresses,
  });
});

exports.getAddress = catchAsync(async (req, res, next) => {
  const currentAddress = await Address.findById(req.params.id);
  if (!currentAddress) {
    return next(new appError('Address not found!', 404));
  }
  res.status(200).json({
    status: 'Success!',
    data: currentAddress,
  });
});

exports.deleteAddress = catchAsync(async (req, res, next) => {
  const deletedAddress = await Address.findByIdAndDelete(req.params.id);
  if (!deletedAddress) {
    return next(new appError('Address is not existed', 404));
  }

  res.status(200).json({
    status: 'Success!',
    message: 'Address is deleted successfully!',
  });
});
