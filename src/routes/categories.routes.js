const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const { checkGetUserAuthorization, checkNameField } = require('../middlewares');

const route = express.Router();

route.post(
  '/categories',
  checkNameField,
  checkGetUserAuthorization, categoriesController.postCategory,
);

route.get('/categories', checkGetUserAuthorization, categoriesController.getAllCategories);

module.exports = route;
