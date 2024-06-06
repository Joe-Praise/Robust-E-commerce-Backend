const Category = require('../models/categoryModel');
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./handlerFactory');

exports.getCategories = getAll(Category);

exports.getOneCategory = getOne(Category);

exports.createCategory = createOne(Category, { field: 'name' });

exports.updateCategory = updateOne(Category);

exports.deleteCategory = deleteOne(Category);
