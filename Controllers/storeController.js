const Store = require('../models/storeModel');

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./handlerFactory');

exports.getStores = getAll(Store);

exports.getOneStore = getOne(Store);

exports.createStore = createOne(Store, { field: 'title' });

exports.updateStore = updateOne(Store);

exports.deleteStore = deleteOne(Store);
