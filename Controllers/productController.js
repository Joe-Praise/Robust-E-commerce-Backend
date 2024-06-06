const Product = require('../models/productModel');
const { getAll, createOne, updateOne, deleteOne } = require('./handlerFactory');
const { calculateRating } = require('../utils/calculateratings');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Review = require('../models/reviewModel');

exports.getProducts = getAll(Product);

exports.getOneProduct = catchAsync(async (req, res, next) => {
  // TODO: check the url use it to confirm the store exists and the ID passed is the same with the DB before granting access or you can use another technique

  const { id } = req.params;
  const path = 'reviews';

  const doc = await Product.findById(id).populate(path);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  const reviews = await Review.find({ productId: id });

  const ratingSummary = calculateRating(reviews);

  doc.active = undefined;
  const copy = doc._doc;
  const data = [{ ...copy, ratingSummary }];

  res.status(200).json({
    status: 'success',
    data,
  });
});

exports.createProduct = createOne(Product, { field: 'name' });

exports.updateProduct = updateOne(Product);

exports.deleteProduct = deleteOne(Product);
