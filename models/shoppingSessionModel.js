const mongoose = require('mongoose');

const { Schema } = mongoose;

const shoppingSessionSchema = new Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User is required!'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required!'],
    default: 0,
  },
  total: {
    type: Number,
    required: [true, 'A cart must have a total'],
    default: 0,
  },
  totalWeight: {
    type: Number,
    required: [true, 'Total session products weight is required!'],
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

shoppingSessionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const ShoppingSession = mongoose.model(
  'ShoppingSession',
  shoppingSessionSchema,
);
module.exports = ShoppingSession;

// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const cartSchema = new Schema({
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User',
//     required: [true, 'User is required!'],
//   },
//   items: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: 'CartItem',
//       required: [true, 'CartItem is required!'],
//     },
//   ],
//   quantity: {
//     type: Number,
//     required: [true, 'A cart must have at least one product'],
//     default: 1,
//   },
//   bill: {
//     type: Number,
//     required: [true, 'A cart must have a bill'],
//   },
//   active: {
//     type: Boolean,
//     default: true,
//     select: false,
//   },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// cartSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Cart = mongoose.model('Cart', cartSchema);
// module.exports = Cart;
