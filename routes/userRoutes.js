const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.post('/sign-up', authController.signUp);

router.post('/log-in', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);
router.post('/resetPassword/:token', authController.verifyCode);
router.patch('/updateMe', authController.protect, userController.updateMe);
router
  .route('/:id')
  .get(userController.getUser)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  )
  .patch(userController.updateUser);

module.exports = router;
