const ShoppingSession = require('../models/shoppingSessionModel');

const catchAsync = require('../utils/catchAsync');
const { getAll, deleteOne, createOne, updateOne } = require('./handlerFactory');

// TODO: create a function that filters only sessions of users from a particular store. this is if you want to create an admin for all stores.
// exports.getStoreSessions= catchAsync(async(req, res, next)=>{})

// this function will be restricted to the admin rn but if the task above is completed. it should be restricted to the super-admin
exports.getShoppingSessions = getAll(ShoppingSession);

exports.getUserSessionHelper = catchAsync(async (req, res, next) => {
  //get cart products for particular user using userId
  // check cart status is active then return that session
  //   if session does not exist return empty array with a message

  const { user } = req.params;

  const session = await ShoppingSession.find({ user_id: user, active: true });

  req.userSession = session;
  next();
});

exports.getUserSession = catchAsync(async (req, res) => {
  // getting user session from helper middleware
  const cart = req.userSession;

  if (!cart) {
    res.status(200).json({
      status: 'success',
      message: 'User cart is empty',
      data: [],
    });
  }

  res.status(200).json({
    status: 'success',
    data: cart,
  });
});

exports.createSession = createOne(ShoppingSession, { field: 'user_id' });

exports.updateUserCart = updateOne(ShoppingSession);

exports.deleteSession = deleteOne(ShoppingSession);
