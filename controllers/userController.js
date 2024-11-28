const User = require('../models/userModel');
const appError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const Email = require('../util/email');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const usersMohtarama = await User.find();
  res.status(200).json({
    status: 'Success!',
    result: usersMohtarama.length,
    data: usersMohtarama,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const userLazeez = await User.findById(req.params.id);
  console.log(userLazeez);
  if (!userLazeez) {
    return next(new appError('user not found!', 404)); //throwing error
  }
  res.status(200).json({
    status: 'Success!',
    data: userLazeez,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  //it creates a new user from the request body that the user has inserted his information inside it
  const userMohtaram = await User.create(req.body);
  await new Email(userMohtaram).send('test', 'love letter');
  res.status(200).json({
    status: 'Success!',
    data: userMohtaram,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const byeUser = await User.findByIdAndDelete(req.params.id);
  if (!byeUser) {
    return next(new appError('user is not existed', 404));
  }
  res.status(200).json({
    status: 'Success!',
    message: 'user is deleted successfully!',
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const freshUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!freshUser) {
    return next(new appError('Cant find user with a matched ID', 404));
  }
  res.status(200).json({
    status: 'Success!',
    data: freshUser,
  });
});
