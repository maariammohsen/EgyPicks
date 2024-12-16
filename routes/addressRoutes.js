const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(authController.protect, addressController.getAllAddresses)
  .post(authController.protect, addressController.createAddress);

router
  .route('/:id')
  .get(authController.protect, addressController.getAddress)
  .patch(authController.protect, addressController.updateAddress)
  .delete(authController.protect, addressController.deleteAddress);

module.exports = router;
