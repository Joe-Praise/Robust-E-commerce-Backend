const mongoose = require('mongoose');
const slugify = require('slugify');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name!'],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please provide product description!'],
    },
    image: {
      type: String,
    },
    discount_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Discount',
    },
    store_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Store',
      required: [true, 'Store is required!'],
    },
    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'A product must have a category!'],
    },
    weight: {
      type: Number,
      required: [true, 'Product weight is required!'],
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      Set: (val) => Math.round(val * 10) / 10,
    },
    ratingSummary: [
      {
        type: Number,
      },
    ],
    ratingsQuantity: { type: Number, default: 0 },
    price: { type: Number, required: [true, 'A product must have a price'] },
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

productSchema.index({ name: 'text' });

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product_id',
  localField: '_id',
});

productSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });

  this.populate({
    path: 'store_id',
    select: '-__v',
  });

  this.populate({
    path: 'category_id',
    select: '-__v',
  });

  this.populate({
    path: 'discount_id',
    select: '-__v',
  });

  next();
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
