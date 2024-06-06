const mongoose = require('mongoose');

const { Schema } = mongoose;

const storeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A store must have a name'],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
storeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
storeSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
