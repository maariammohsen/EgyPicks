const  mongoose = require('mongoose');
const Product = require('../models/productModel');
const User = require('../models/userModel');


const wishlistSchema =  new mongoose.Schema({
userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true,'wishlist must belong to a user']    
    },
products:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
     }]
});

wishlistSchema.virtual('productDetails',{
    ref: 'Product',
    localField: 'products',
    foreignField:'_id'
},

    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }

);

wishlistSchema.pre('find', function(next) {
    this.populate('products'); 
    next();
  }

);
  
const Wishlist = mongoose.model('Wishlist',wishlistSchema );
module.exports =  Wishlist;
