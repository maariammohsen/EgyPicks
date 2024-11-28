const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const user = new mongoose.Schema({
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  name: {
    type: String,
    required: [true, 'required! user must have a name'],
    validate: {
      validator: (val) => {
        return /^[a-zA-Z0-9-]+$/.test(val);
      },
      message: 'username must contain letters & numbers and no white spaces',
    },
  },
  birthDate: {
    type: Date,
    required: [true, 'required! user must insert birthdate'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'required! user must insert phone number'],
    validate: {
      validator: (num) => {
        const numBeginning = ['010', '011', '012', '015'];
        if (num.length !== 11) {
          return false;
        }
        if (!numBeginning.includes(num.slice(0, 3))) {
          return false;
        }
        return true;
      },
      message: 'this is an invalid egyptian number',
    },
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'required! user must insert an invalid email'],
    validate: [validator.isEmail, 'the email is invalid!'],
  },
  passwordValidate: {
    type: String,
    required: [true, 'required! user must insert a strong password'],
    validate: {
      validator: function (ele) {
        return ele === this.password;
      },
      message: 'Password are not correct!',
    },
  },
  password: {
    type: String,
    required: [true, 'required! user must insert a strong password'],
    select: false, //hidden output
  },
  resetToken: String,
  resetTokenTimer: Date,
  address: {
    type: String,
    required: [true, 'required! user must insert addresss!'],
  },
});

user.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordValidate = undefined;
  next();
});

user.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

user.methods.createResetToken = function () {
  const resettoken = crypto.randomBytes(32).toString('hex');
  this.resetToken = crypto
    .createHash('sha256')
    .update(resettoken)
    .digest('hex');
  this.resetTokenTimer = Date.now() + 10 * 60 * 1000;
  return this.resetToken;
};

const userModel = mongoose.model('User', user);
module.exports = userModel;
