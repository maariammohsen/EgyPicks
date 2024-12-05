const User = require('../models/userModel');
const appError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const email = require('../util/Email.js');

const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((ele) => {
    if (allowedFields.includes(ele)) newObj[ele] = obj[ele];
  });
  return newObj;
};
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

//creating user manually
exports.createUser = catchAsync(async (req, res, next) => {
  const userMohtaram = await User.create(req.body);
  await new email(userMohtaram).welcomeMail('welcome to EgyPicks!');
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
    new: true, //set to true to return the updated object
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

///UPDATING CURRENTLY AUTHENITCATED USERS:
exports.updateMe = catchAsync(async (req, res, next) => {
  //this middleware only handles the basic user data except 'PASSWORD'
  if (req.body.password || req.body.passwordValidate) {
    return next(
      new appError(
        'This route is not for password update , please use /updateMyPassword',
        400
      )
    );
  }
  const filteredBody = filteredObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'Success',
    data: { user: updatedUser },
  });
});
