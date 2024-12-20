const mongoose = require('mongoose');
const discountSchema = new mongoose.Schema({
  discountCode: {
    type: String,
    required: [true, 'A promo code must be inserted!'],
  },
  discountPercentage: {
    type: String,
    required: [true, 'A discount code must be inserted!'],
  },
  validUntil: {
    type: Date,
    required: [true, 'Promo Code must have an expiration date!'],
  },
});

const discountModel = mongoose.model('Discount', discountSchema);

module.exports = discountModel;
