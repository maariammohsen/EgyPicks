const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../util/catchAsync');
const email = require('../util/email');
const appError = require('../util/appError');
const Address = require('../models/addressModel.js');
const signedToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, //options
  });
};

const cookiesAndTokens = (user, res, statusCode) => {
  const token = signedToken(user._id);
  const cookiesOptions = {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 90 * 1000 * 60 * 60 * 24), //milliseconds to 90 days
  };
  user.password = undefined;
  if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;
  res.cookie('JWT', token, cookiesOptions);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    email: req.body.email,
    password: req.body.password,
    passwordValidate: req.body.passwordValidate,
    phoneNumber: req.body.phoneNumber,
    birthDate: req.body.birthDate,
  });
  const address = await Address.create(req.body.address);
  await new email(newUser).welcomeMail('welcome to EgyPicks!');

  cookiesAndTokens(newUser, res, 201);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new appError('invalid email & password!please provide a valid one'),
      400
    );
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError('OOPS! Incorrect Email or Password', 401));
  }
  cookiesAndTokens(user, res, 200);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const userman = await User.findOne({ email: req.body.email });
  if (!userman)
    return next(new appError('there is no user with that email', 404));

  const resetToken = userman.createResetToken();
  await userman.save({ validateBeforeSave: false });
  try {
    await new email(userman).resetMail(userman.resetToken, 'resetToken');
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

exports.verifyCode = catchAsync(async (req, res, next) => {
  const userfresh = await User.findOne({
    resetToken: req.params.token,
    resetTokenTimer: { $gte: Date.now() },
  });
  if (!userfresh) return next(new appError('invalid token', 400));

  // res.cookie('verifed', `${userfresh.resetToken}|${userfresh.email}`);
  res.status(200).json({
    status: 'success',
    token: req.params.token,
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // if (!req.cookies.verifed)
  //   return next(new appError("you can't access this route"), 403);
  // const data = req.cookies.verifed.split('|');
  const { email, resetToken } = req.body;
  console.log(req.body);
  const userfresh = await User.findOne({
    email,
    resetToken,
    resetTokenTimer: { $gte: Date.now() },
  });
  if (!userfresh) return next(new appError('invalid', 400));

  userfresh.password = req.body.password;
  userfresh.passwordValidate = req.body.passwordValidate;
  userfresh.resetToken = undefined;
  userfresh.resetTokenTimer = undefined;
  userfresh.passwordChangedAt = Date.now();
  await userfresh.save();
  res.clearCookie('verifed');
  cookiesAndTokens(userfresh, res, 200);
});

///AUTHENTICATION MIDDLEWARE
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.JWT) {
    token = req.cookies.JWT;
  }
  if (!token) return next(new appError(`You're not logged in!`), 401);
  //verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new appError(
        'The user belonging to this token does not longer exist',
        401
      )
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new appError('User recently changed password! please log in again', 401)
    );
  }
  //grant access to protected route
  req.user = currentUser;
  next();
});

///AUTHORIZATION MIDDLEWARE
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new appError('You dont have the permission to do this action', 403)
      );
    }
    next();
  };
};
