const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      enum: [
        'Amitiè',
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
    logo: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

brandSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'brandId',
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
