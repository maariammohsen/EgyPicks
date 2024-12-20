const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const authController = require('../controllers/authController');

router.use (authController.protect)
router
.route('/myWishlist')
.get( wishlistController.getMyWishlist);

router
  .route('/')
  .get(wishlistController.getAllWishlists)
  .post(wishlistController.createWishlist);


router
  .route('/:id')
  .get(wishlistController.getWishlist)
  .patch(wishlistController.updateWishlist)
  .delete(wishlistController.deleteWishlist);

  
module.exports = router;