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
    enum: ['Clothes', 'Bags&Shoes', 'Accessories', 'Cosmetics', 'Fragrance'],
    required: [true, 'Each product must have a category'],
  },

  quantity: {
    type: Number,
    required: true,
  },

  brandName: {
    type: String,
    // enum: ['basiclook', 'town team', 'lilly', 'Bou', 'azor', 'Janelle', 'favelin', 'nuit'],
    required: [true, 'A product must belong to a brand'],
  },

  Price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },

  show: {
    type: Boolean,
    default: true,
  },

  photo: String,

  title: String,
  slug: String,
  // review: {
  //   type: mongoose.schema.objectId,
  //   ref: 'review',
  // },

  // order: {
  //   type: mongoose.schema.objectId,
  //   ref: 'order',
  // },
  brandId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Brand',
    required: true,
  },
  gender: { type: String, enum: ['Male', 'Female', 'Unisex'], required: true },
  material: {
    type: String,
    enum: ['Cotton', 'Polyester', 'Leather'],
  },
  subCategory: {
    type: String,
  },
  size: String,

  discountPrice: {
    type: Number,
  },
  avgRating: Number,
  quantityRating: Number,
  description: {
    type: String,
  },
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
