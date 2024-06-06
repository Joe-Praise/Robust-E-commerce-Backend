const express = require('express');
const {
  getDiscounts,
  getOneDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} = require('../Controllers/discountController');
const { Protect, restrictTo } = require('../Controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getDiscounts)
  .post(Protect, restrictTo('admin'), createDiscount);

router.use(Protect, restrictTo('admin'));
router
  .route('/:id')
  .get(getOneDiscount)
  .patch(updateDiscount)
  .delete(deleteDiscount);

module.exports = router;
