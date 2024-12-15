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
  order: {
    ref: 'Order',
    type: mongoose.Schema.ObjectId,
    required: [true, 'Discount must belong to an order'],
  },
});

const discountModel = mongoose.model('Discount', discountSchema);

module.exports = discountModel;
