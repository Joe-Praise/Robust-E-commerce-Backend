const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartItemSchema = new Schema({
  session_id: {
    type: Schema.Types.ObjectId,
    ref: 'ShoppingSession',
    required: [true, 'ShoppingSession is required!'],
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required!'],
  },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

cartItemSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
