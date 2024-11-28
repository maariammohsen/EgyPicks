const jwt = require('jsonwebtoken');
const user = require('../models/userModel');
const catchAsync = require('../util/catchAsync');
const email = require('../util/email');

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordValidate: req.body.passwordValidate,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    birthDate: req.body.birthDate,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  await new email(newUser).send('test', 'welcome to EgyPicks!');

  res.status(201).json({
    status: 'success!',
    token,
    data: {
      user: newUser,
    },
  });
});
