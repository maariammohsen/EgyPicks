const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
  },

  category: {
    type: String,
    // enum: ['Clothes', 'Bags&Shoes', 'Accessories', 'Cosmetics', 'Fragrance'],
    required: [true, 'Each product must have a category'],
  },

  quantity: {
    type: Number,
    required: true,
  },

  brandName: {
    type: String,
    // enum: [],
    required: [true, 'A product must belong to a brand'],
  },

  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },

  show: {
    type: Boolean,
    default: [
      true,
      'if (yes) show the product, if (no) do not show the product',
    ],
  },

  image: {
    type: String,
    required: [true, 'A product must have an image'],
  },

  images: [String],

  title: String,

  // review: {
  //   type: mongoose.schema.objectId,
  //   ref: 'review',
  // },

  // order: {
  //   type: mongoose.schema.objectId,
  //   ref: 'order',
  // },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
