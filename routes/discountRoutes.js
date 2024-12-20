const discountController = require('../controllers/discountController');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
router.use(authController.protect);
router
  .route('/Promo-codes')
  .get(discountController.getAllDiscounts)
  .post(authController.restrictTo('admin'), discountController.createDiscount);

router
  .route('/:id')
  .get(discountController.getDiscount)
  .patch(authController.restrictTo('admin'), discountController.updateDiscount)
  .delete(
    authController.restrictTo('admin'),
    discountController.deleteDiscount
  );

module.exports = router;
