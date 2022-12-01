const express = require('express');
const usersController = require('../controllers/users.controller');
const { checksLoginFields,
  checksUserRegistrationFields, checkGetUserAuthorization } = require('../middlewares');

const route = express.Router();

route.post('/login', checksLoginFields, usersController.login);

route.post('/user', checksUserRegistrationFields, usersController.postUser);

route.get('/user', checkGetUserAuthorization, usersController.getAllUsers);

module.exports = route;
