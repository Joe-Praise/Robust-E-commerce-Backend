const express = require('express');
const { Protect, restrictTo } = require('../Controllers/authController');
const {
  getShoppingSessions,
  getUserSessionHelper,
  getUserSession,
  createSession,
  updateUserCart,
  deleteSession,
} = require('../Controllers/shoppingSessionController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getShoppingSessions)
  .post(Protect, restrictTo('admin'), createSession);

// router.use(Protect);
router
  .route('/:id')
  .get(getUserSessionHelper, getUserSession)
  .patch(getUserSessionHelper, updateUserCart)
  .delete(Protect, restrictTo('admin'), deleteSession);

module.exports = router;
