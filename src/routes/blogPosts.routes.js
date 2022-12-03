const express = require('express');
const blogPostsController = require('../controllers/blogPosts.controller');
const { checkGetUserAuthorization, checkNewPostFields } = require('../middlewares');

const route = express.Router();

route.post(
    '/post',
    checkGetUserAuthorization,
    checkNewPostFields,
    blogPostsController.postBlogPost,
  );

route.get('/post', checkGetUserAuthorization, blogPostsController.getAllBlogPosts);

module.exports = route;
