const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

categorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
