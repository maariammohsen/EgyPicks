const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const authController = require('../controllers/authController');

router
  .route('/Local-brands')
  .get(brandController.getAllBrands)
  .post(
    brandController.uploads,
    brandController.resizeImg,
    brandController.createBrand
  );

router
  .route('/:id')
  .patch(brandController.updateBrand)
  .delete(brandController.deleteBrand)
  .get(brandController.getBrand);

module.exports = router;
