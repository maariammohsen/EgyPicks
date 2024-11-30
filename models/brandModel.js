const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      enum: [
        'Azor',
        'Lilly',
        'Nuit',
        'Favelin',
        'Town team',
        'Bou',
        'The basic look',
        'Janelle',
      ],
      required: true,
    },
    description: {
      type: String,
    },
    logo: String,
  },
  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

brandSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'brandId',
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
