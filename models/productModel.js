const mongoose = require('mongoose');
const slugify = require('slugify');
const Review = require('./reviewModel');
const Order = require('./orderModel');

const customValidate = function () {
  return this.isCustomized;
};
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
    },

    category: {
      type: String,
      enum: [
        'Clothes',
        'Bags',
        'Shoes',
        'Accessories',
        'Cosmetics',
        'Fragrance',
      ],
      required: [true, 'Each product must have a category'],
    },

    quantity: {
      type: Number,
      required: true,
    },
    price: {
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

    brandId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Unisex', 'Kids'],
      required: true,
    },
    material: {
      type: String,
      enum: [
        'Cotton',
        'Polyester',
        'Leather',
        'Rib Fabric',
        'Microfiber Fabric',
        'Licra',
        'Linen Cotton',
        'Quick-Drying Fabric',
        'Waterproof',
        'wool',
        'Trico Thread',
        'Milton',
        'Shiny Leather',
        'Jeans',
        'Crescent Fabric',
        'Metallic snake leather',
        'Textured Material',
        'Faux Leather',
        'Velvet',
        'Stainless Steel',
      ],
    },
    subCategory: {
      type: String,
    },
    sizes: [String],

    discountPrice: {
      type: Number,
    },
    avgRating: Number,
    quantityRating: Number,
    description: {
      type: String,
    },
    isCustomized: {
      type: Boolean,
    },
    color: {
      type: String,
      enum: ['Black', 'White', 'Burgundy', 'Navy Blue', 'Light Beige'],
      validate: { validator: customValidate },
    },
    text: {
      type: String,
      validate: { validator: customValidate },
    },
    customProductImage: {
      type: String,
      validate: { validator: customValidate },
    },
    font: {
      type: String,
      enum: [
        'Roboto',
        'Lobster',
        'Montserrat',
        'Merriweather',
        'Dancing Script',
      ],
      validate: { validator: customValidate },
    },
  },

  { timestamps: true } //created at
);
productSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'productsDetails.product',
});

productSchema.index({
  price: 1,
});

productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'productId',
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
