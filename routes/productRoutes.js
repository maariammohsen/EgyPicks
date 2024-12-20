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

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProduct
  );

router.post(
  '/custom-products',
  authController.protect,
  productController.createCustomizedPorduct
);

module.exports = router;
