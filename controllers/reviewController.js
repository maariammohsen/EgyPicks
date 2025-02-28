const Review = require('./../models/reviewModel');
const apifeature = require('../util/apifeatures');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
    const query = new apifeature(Review.find(), req.query)
      .filter()
      .limitField()
      .sort()
      .pagination();
    const reviews = await query.query;
  
    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
      },
    });
  });

exports.getReview = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(new AppError('No review found with that id', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  });


exports.createReview = catchAsync(async (req, res, next) => {
    const newReview = await Review.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        review: newReview,
      },
    });
  });

exports.updateReview = catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!review) {
      return next(new AppError('No review found with that id', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  });

exports.deleteReview = catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id);
  
    if (!review) {
      return next(new AppError('No review found with that id', 404));
    }
  
    res.status(204).json({
      status: 'success',
    });
  });

  
  



