const express = require('express');
const { Protect, restrictTo } = require('../Controllers/authController');
const {
  createStore,
  getStores,
  getOneStore,
  updateStore,
  deleteStore,
} = require('../Controllers/storeController');

const router = express.Router();

router
  .route('/')
  .get(getStores)
  .post(Protect, restrictTo('admin'), createStore);

router.use(Protect);
router.route('/:id').get(getOneStore).patch(updateStore).delete(deleteStore);

module.exports = router;
