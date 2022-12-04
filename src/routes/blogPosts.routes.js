const express = require('express');
const blogPostsController = require('../controllers/blogPosts.controller');
const { checkGetUserAuthorization,
  checkNewPostFields, checkPostUptatedFields } = require('../middlewares');

const route = express.Router();

route.post(
    '/post',
    checkGetUserAuthorization,
    checkNewPostFields,
    blogPostsController.postBlogPost,
  );

route.get(
    '/post',
    checkGetUserAuthorization,
    blogPostsController.getAllBlogPosts,
  );

route.get(
  '/post/:id',
  checkGetUserAuthorization,
  blogPostsController.getBlogPostById,
);

route.put(
  '/post/:id',
  checkPostUptatedFields,
  checkGetUserAuthorization,
  blogPostsController.uptadePost,
);

module.exports = route;
