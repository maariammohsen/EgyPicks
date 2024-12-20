const Wishlist = require('../models/wishlistModel');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');

exports.getAllWishlists = catchAsync(async (req, res, next) => {
  const wishlists = await Wishlist.find();
  res.status(200).json({
    status: 'Success!',
    result: wishlists.length,
    data: wishlists,
  });
});

exports.getMyWishlist = catchAsync(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ userId: req.user._id })
    .populate('products'); 
  if (!wishlist) {
    return next(new AppError('Wishlist not found!', 404));
  }
  res.status(200).json({
    status: 'Success!',
    data: wishlist,
  });
});

exports.getWishlist = catchAsync(async (req, res, next) => {
  const wishlist = await Wishlist.findById(req.params.id);
  if (!wishlist) {
    return next(new AppError('wishlist not found!', 404));
  }
  res.status(200).json({
    status: 'Success!',
    data: wishlist,
  });
});

exports.createWishlist= catchAsync(async (req, res, next) => {
  const newWishlist = await Wishlist.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      wishlist: newWishlist,
    },
  });
});

exports.updateWishlist = catchAsync(async (req, res, next) => {
  const { action, productId } = req.body; 

  const wishlist = await Wishlist.findOne({ 
    _id: req.params.id, 
    userId: req.user._id  
  });

  if (!wishlist) {
    return next(new AppError('No wishlist found for this user with that id', 404));
  }

  if (action === 'add') {
    // Prevent adding duplicates 
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId); 
    } else {
      return next(new AppError('Product is already in the wishlist', 400));
    }
  } else if (action === 'remove') {
    wishlist.products.pull(productId);
  } else {
    return next(new AppError('Invalid action. Use "add" or "remove".', 400));
  }
  await wishlist.save();

  res.status(200).json({
    status: 'success',
    data: {
      wishlist,
    },
  });
});


exports.deleteWishlist = catchAsync(async (req, res, next) => {
  const wishlist = await Wishlist.findByIdAndDelete(req.params.id);

  if (!wishlist) {
    return next(new AppError('No wishlist found with that id', 404));
  }

  res.status(204).json({
    status: 'success',
  });
});
