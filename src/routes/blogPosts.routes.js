const express = require('express');
const blogPostsController = require('../controllers/blogPosts.controller');
const { checkGetUserAuthorization } = require('../middlewares');

const route = express.Router();

route.get('/post', checkGetUserAuthorization, blogPostsController.getAllBlogPosts);

module.exports = route;
