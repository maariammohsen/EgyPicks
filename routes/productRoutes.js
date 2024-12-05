const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
//router.param('id', productController.checkID);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    productController.uploads,
    productController.resize,
    productController.createProduct
  );

router.route('/product-stats').get(productController.getProductStats);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProduct
  );

module.exports = router;
