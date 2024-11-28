const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../util/catchAsync');
const email = require('../util/email');
const appError = require('../util/appError');

const signedToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordValidate: req.body.passwordValidate,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    birthDate: req.body.birthDate,
  });

  const token = signedToken(newUser._id);
  await new email(newUser).send('test', 'welcome to EgyPicks!');

  res.status(201).json({
    status: 'success!',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new appError('please provide invalid email & password!'), 400);
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError('OOPS! Incorrect Email or Password', 401));
  }
  const token = signedToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
