const express = require('express');
const usersController = require('../controllers/users.controller');
const { checksLoginFields } = require('../middlewares');

const route = express.Router();

route.post('/login', checksLoginFields, usersController.login);

module.exports = route;
