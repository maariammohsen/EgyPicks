const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const user = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    Fname: {
      type: String,
      required: [true, 'required! user must have a  first name'],
      validate: {
        validator: (val) => {
          return /^[a-zA-Z0-9-]+$/.test(val);
        },
        message: 'username must contain letters & numbers and no white spaces',
      },
    },
    Lname: {
      type: String,
      required: [true, 'required! user must have a last name'],
      validate: {
        validator: (val) => {
          return /^[a-zA-Z0-9-]+$/.test(val);
        },
        message:
          "user's last name must contain letters & numbers and no white spaces",
      },
    },
    fullName: {
      type: String,
      default: function () {
        return `${this.Fname.charAt(0).toUpperCase() + this.Fname.slice(1)}${
          this.Lname.charAt(0).toUpperCase() + this.Lname.slice(1)
        }`;
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
    passwordChangedAt: Date,
    usedPromo: [
      {
        type: mongoose.Schema.ObjectId,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

user.virtual('addresses', {
  ref: 'Address',
  localField: '_id',
  foreignField: 'userID',
});

user.pre('find', async function (next) {
  this.populate('addresses');
  next();
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
  const randomItems = '1234567890';
  let token = '';
  for (let i = 0; i < 4; i++) {
    token +=
      randomItems[Math.floor(Math.random() * randomItems.length)] ||
      randomItems[randomItems.length - 1];
  }
  this.resetToken = token;
  this.resetTokenTimer = Date.now() + 10 * 60 * 1000; //10 minutes
  return token;
};

user.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

const userModel = mongoose.model('User', user);
module.exports = userModel;
