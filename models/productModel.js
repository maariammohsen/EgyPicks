const mongoose = require('mongoose');
const slugify = require('slugify');

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

  Price: {
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

  Sales: {
    type: Number,
  },
  slug: String,
  // review: {
  //   type: mongoose.schema.objectId,
  //   ref: 'review',
  // },

  // order: {
  //   type: mongoose.schema.objectId,
  //   ref: 'order',
  // },
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  //this will point to the current document
  next();
});

productSchema.pre(/^find/, function (next) {
  this.find({ show: { $ne: false } });
  //this will point to the current query
  // this.start = Date.now();
  next();
});

productSchema.post(/^find/, function (docs, next) {
  // console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
