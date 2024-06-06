const CartItem = require('../models/cartItemModel');
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./handlerFactory');

exports.getCartItems = getAll(CartItem);

exports.getOneCartItem = getOne(CartItem);

exports.createCartItem = createOne(CartItem, { field: 'product_id' });

exports.updateCartItem = updateOne(CartItem);

exports.deleteCartItem = deleteOne(CartItem);
