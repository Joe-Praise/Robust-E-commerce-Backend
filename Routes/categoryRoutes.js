const express = require('express');
const {
  getCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../Controllers/categoryController');
const { restrictTo, Protect } = require('../Controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getCategories)
  .post(Protect, restrictTo('admin'), createCategory);

router
  .route('/:id')
  .get(getOneCategory)
  .patch(Protect, restrictTo('admin'), updateCategory)
  .delete(Protect, restrictTo('admin'), deleteCategory);

module.exports = router;
