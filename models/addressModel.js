const mongoose = require('mongoose');
const User = require('./userModel');
const addressSchema = new mongoose.Schema({
  countryRegion: {
    type: String,
    default: 'Egypt',
  },
  governorate: {
    type: String,
    enum: [
      '6th of October City',
      '10th of Ramadan City',
      'al-Mansura',
      'al-Minya',
      '	Alexandria',
      'Arish',
      'Asyut',
      'Beni Suef',
      'Cairo',
      'Damietta',
      'Fayyum',
      'Giza',
      'Hurghada',
      'Ismailia',
      'Portsaid',
      'Suez',
      'Tanta',
    ],
    required: [true, 'You must select a Governorate'],
  },
  Town: {
    type: String,
    required: [true, 'You must insert a Town/City'],
  },
  streetAddress: {
    type: String,
    required: [true, 'You must insert a street address'],
  },
  optionalMobileNumber: {
    type: String,
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const addressmodel = mongoose.model('Address', addressSchema);
module.exports = addressmodel;
