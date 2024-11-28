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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const userman = await User.findOne({ email: req.body.email });
  if (!userman)
    return next(new appError('there is no user with that email', 404));

  const resetToken = userman.createResetToken();
  await userman.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetPassword/${resetToken}`;
  try {
    await new email(userman, resetURL).resetMail('resetToken');
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    userman.resetToken = undefined;
    userman.resetTokenTimer = undefined;
    await userman.save({ validateBeforeSave: false });
    return next(
      new appError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const userfresh = await User.findOne({
    resetToken: req.params.token,
    resetTokenTimer: { $gte: Date.now() },
  });
  if (!userfresh) return next(new appError('invalid token', 400));
  userfresh.password = req.body.password;
  userfresh.passwordValidate = req.body.passwordValidate;
  userfresh.resetToken = undefined;
  userfresh.resetTokenTimer = undefined;
  await userfresh.save();
  const token = jwt.sign({ id: userfresh._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    status: 'success',
    token,
    user: userfresh,
  });
});
