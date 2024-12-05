const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(authController.protect, orderController.createOrder);
router.get('/me', authController.protect, orderController.getUserOrders);
router.get('/best-sellers', orderController.bestSeller);
router
  .route('/:id')
  .get(authController.protect, orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);
module.exports = router;
