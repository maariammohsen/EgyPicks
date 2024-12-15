const mongoose = require('mongoose');
const Product = require('./productModel');
const Discount = require('./discountModel');
const { promocode } = require('../controllers/discountController');
const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending payment', 'shipped', 'delivered', 'received', 'refunded'],
    required: [true, 'order must have status'],
    default: 'received',
  },
  total_amount: {
    type: Number,
    required: [true, 'order must have total amount'],
    default: 0,
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.ObjectId,
    required: [true, 'order must belong to user'],
  },
  promocode: {
    ref: 'Discount',
    type: mongoose.Schema.ObjectId,
  },
  productsDetails: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'order must have to product'],
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    },
  ],
  paymentType: {
    type: String,
    enum: ['Cash On Delivery (COD)', 'Online Payment'],
    required: true,
  },
});

orderSchema.pre('save', async function (next) {
  this.productsDetails.forEach((ele) => {
    this.total_amount += ele.price * ele.quantity;
  });
  console.log(this.promocode);
  console.log(this.total_amount);
  if (this.promocode) {
    const promo = await Discount.findOne({ _id: this.promocode });
    this.total_amount -= this.total_amount * (promo.discountPercentage / 100);
  }
  next();
});

orderSchema.post('save', async function () {
  await Promise.all(
    this.productsDetails.map((el) => {
      return Product.findByIdAndUpdate(el.product, {
        $inc: { quantity: -el.quantity },
      });
    })
  );
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;
