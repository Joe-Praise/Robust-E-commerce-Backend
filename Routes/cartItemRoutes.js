const express = require('express');
const {
  getCartItems,
  getOneCartItem,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} = require('../Controllers/cartItemController');
const { Protect, restrictTo } = require('../Controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getCartItems)
  .post(Protect, restrictTo('user'), createCartItem);

router.use(Protect);
router
  .route('/:id')
  .get(getOneCartItem)
  .patch(updateCartItem)
  .delete(deleteCartItem);

module.exports = router;
