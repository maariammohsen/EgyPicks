const Product = require('./../models/productModel');
const apifeature = require('../util/apifeatures');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const slugify = require('slugify');
const sharp = require('sharp');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  cb(null, false);
};
const upload = multer({ storage, fileFilter });
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const query = new apifeature(Product.find(), req.query)
    .filter()
    .limitField()
    .sort()
    .pagination();
  const products = await query.query;

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate('brandId')
    .populate('reviews');

  if (!product) {
    return next(new AppError('No product found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

exports.createCustomizedPorduct = catchAsync(async (req, res, next) => {
  const newCustomProduct = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      product: newCustomProduct,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('No product found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('No product found with that id', 404));
  }
  fs.unlinkSync(`./images/product-pics/${product.photo}`);
  res.status(204).json({
    status: 'success',
  });
});

exports.uploadCustomize = upload.single('customProductImage');
exports.resizeCustom = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const slugName = slugify(req.body.name);
  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .toFile(`images/product-pics/${slugName}.jpeg`);

  req.body.customProductImage = `${slugName}.jpeg`;
  next();
});

exports.uploads = upload.single('photo');
exports.resize = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const slugName = slugify(req.body.name);
  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .toFile(`images/product-pics/${slugName}.jpeg`);

  req.body.photo = `${slugName}.jpeg`;
  next();
});
