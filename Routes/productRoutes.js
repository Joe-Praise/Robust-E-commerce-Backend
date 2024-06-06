const express = require('express');
const { Protect, restrictTo } = require('../Controllers/authController');
const {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../Controllers/productController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getProducts)
  .post(Protect, restrictTo('admin'), createProduct);

router
  .route('/:id')
  .get(getOneProduct)
  .patch(Protect, restrictTo('admin'), updateProduct)
  .delete(Protect, restrictTo('admin'), deleteProduct);

module.exports = router;
