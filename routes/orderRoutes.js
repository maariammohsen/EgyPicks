const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    orderController.getAllOrders
  )
  .post(authController.protect, orderController.createOrder);
router.post(
  '/checkout-session',
  authController.protect,
  orderController.createSession
);
router.get('/me', authController.protect, orderController.getUserOrders);
router.get('/best-sellers', orderController.bestSeller);
router
  .route('/:id')
  .get(authController.protect, orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);
module.exports = router;
