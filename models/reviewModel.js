const mongoose = require('mongoose');
const slugify = require('slugify');

const reviewSchema = new mongoose.schema({
    rating:{
        type: int ,
        required: true
    },

    review: {
        type: String,
        required:true
    },
    userId:{
        type:mongoose.schema.objectId,
        ref: 'User',
        required:[true,'review must belong to a user']    
    },
    productId:{
        type:mongoose.schema.objectId,
        ref:'Product',
        required:[true, 'review must belong to a product' ]
    }
});

const Review = mongoose.model(Review, reviewSchema);
model.export = Review;
