const mongoose = require('mongoose');
const Product = require('./productModel');

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must have a user'],
    },
    product_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'A review must have a product'],
    },
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  this.populate({
    path: 'userId',
    select: '-__v -password',
  });
  next();
});

reviewSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

reviewSchema.statics.calcAverageRatings = async function (product) {
  const stats = await this.aggregate([
    {
      $match: { product },
    },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length) {
    await Product.findByIdAndUpdate(product, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(product, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// it calculates the average when the document is being saved
reviewSchema.post('save', function () {
  // this points to current review document
  this.constructor.calcAverageRatings(this.product);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  // get the current review document before /^findOneAnd/ save it to this.r
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function (next) {
  // get the document before save and save it to this.r
  //   this.r = await this.findOne();
  await this.r.constructor.calcAverageRatings(this.r.product);
  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
