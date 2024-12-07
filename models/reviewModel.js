const mongoose = require('mongoose');
const slugify = require('slugify');

const reviewSchema = new mongoose.Schema({
    rating:{
        type: Number ,
        required: true
    },

    review: {
        type: String,
        required:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:[true,'review must belong to a user']    
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:[true, 'review must belong to a product' ]
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
