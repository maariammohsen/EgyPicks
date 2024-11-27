const Product = require('./../models/productModel');
const apifeature = require('../util/apifeatures');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');

//CRUD OPERATIONS

//READ
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
  const product = await Product.findById(req.params.id);
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

//CREATE

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

//UPDATE
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

//DELETE
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('No product found with that id', 404));
  }

  res.status(204).json({
    status: 'success',
  });
});

exports.getProductStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $match: { Sales: { $gte: 5 } } },
      {
        $group: {
          _id: '$category',
          numProducts: { $sum: 1 },
          numSales: { $sum: '$Sales' },
          avgSales: { $avg: '$Sales' },
          avgPrice: { $avg: '$Price' },
          minPrice: { $min: '$Price' },
          maxPrice: { $max: '$Price' },
        },
      },
      {
        $sort: { avgPrice: 1 }, //1 asc , -1 desc
      },
      // {
      //   $match: {
      //     _id: { $ne: 'Beauty' }, //not equal
      //   },
      // },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
