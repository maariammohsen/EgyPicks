const mongoose = require('mongoose');
const Product = require('./productModel');
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

reviewSchema.statics.calcAverageRatings = async function(productId){
    const stats = await this.aggregate([
        {
             $match: {product: productId}
        },
        {
            $group: {
                _id: '$product',
                nRating: { $sum: 1},
                avgRating: { $avg: '$rating'}
            }
        }
    ]);
    console.log(stats);

    if (stats.length > 0){
        await Product.findByIdAndUpdate(productId,{
            quantityRating: stats[0].nRating,
            avgRating: stats[0].avgRating
            });
        }else{
          await Product.findByIdAndUpdate(productId,{
          quantityRating:  0,
          avgRating: 4.5
        });
    }
    
};

reviewSchema.post('save', function() {
   this.constructor.calcAverageRatings(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function(next){
this.rev = await this.model.findOne();
console.log(this.rev);
next();
});

reviewSchema.post(/^findOneAnd/, async function() {
   await  this.rev.constructor.calcAverageRatings(this.rev.product);
  });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
