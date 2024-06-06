const Discount = require('../models/discountModel');
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./handlerFactory');

exports.getDiscounts = getAll(Discount);
exports.getOneDiscount = getOne(Discount);
exports.createDiscount = createOne(Discount, { field: 'name' });
exports.updateDiscount = updateOne(Discount);
exports.deleteDiscount = deleteOne(Discount);
