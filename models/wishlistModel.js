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
  
const Wishlist = mongoose.model('Wishlist',wishlistSchema );
module.exports =  Wishlist;
