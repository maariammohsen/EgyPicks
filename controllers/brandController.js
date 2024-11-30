const Brand = require('../models/brandModel');
const appError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const multer = require('multer');
const sharp = require('sharp');
const slugify = require('slugify');
const storage = multer.memoryStorage();
const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith('image')) cb(null, true);
  cb(null, false);
};
const upload = multer({ storage, fileFilter });
exports.getAllBrands = catchAsync(async (req, res, next) => {
  const Brands = await Brand.find();
  res.status(200).json({
    status: 'Success!',
    result: Brands.length,
    data: Brands,
  });
});

exports.getBrand = catchAsync(async (req, res, next) => {
  const myBrand = await Brand.findById(req.params.id).populate({
    path: 'products',
    select: 'name image price discountPrice quantity',
  });
  if (!myBrand) {
    return next(new appError('Brand is not found!', 404));
  }
  res.status(200).json({
    status: 'Success!',
    data: myBrand,
  });
});

exports.createBrand = catchAsync(async (req, res, next) => {
  const newBrand = await Brand.create(req.body);
  res.status(200).json({
    status: 'Success!',
    data: newBrand,
  });
});

exports.updateBrand = catchAsync(async (req, res, next) => {
  const brandFresh = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!brandFresh) {
    return next(new appError('Cant find the requested brand', 404));
  }
  res.status(200).json({
    status: 'Success!',
    data: brandFresh,
  });
});

exports.deleteBrand = catchAsync(async (req, res, next) => {
  const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
  if (!deletedBrand) {
    return next(new appError('user is not existed', 404));
  }
  res.status(200).json({
    status: 'Success!',
    message: 'Brand is deleted successfully!',
  });
});

exports.uploads = upload.single('logo');

exports.resizeImg = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const slug = slugify(req.body.brandName);
  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .toFile(`images/brandLogo/${slug}.jpeg`);

  req.body.logo = `${slug}.jpeg`;
  next();
});
