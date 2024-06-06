const mongoose = require('mongoose');

const { Schema } = mongoose;

const discountSchema = new Schema({
  name: { type: String, required: [true, 'Please provide discount name'] },
  description: {
    type: String,
    required: [true, 'Please provide product description!'],
  },
  discount_percent: {
    type: Number,
    required: [true, 'Please provide discount percentage'],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
discountSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Discount = mongoose.model('Discount', discountSchema);
module.exports = Discount;
