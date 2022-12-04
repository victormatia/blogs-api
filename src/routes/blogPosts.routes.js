const express = require('express');
const blogPostsController = require('../controllers/blogPosts.controller');
const { checkGetUserAuthorization,
  checkNewPostFields, checkPostUptatedFields } = require('../middlewares');
  
const route = express.Router();

route.get(
  '/post/search?',
  checkGetUserAuthorization,
  blogPostsController.findPostByTerm,
);

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

route.delete(
  '/post/:id',
  checkGetUserAuthorization,
  blogPostsController.deletePost,
);

module.exports = route;
