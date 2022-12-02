const blogPostService = require('../services/blogPosts.service');

const getAllBlogPosts = async (req, res) => {
  const { authorization } = req.headers;

  const { result, message } = await blogPostService.getAllBlogPosts(authorization);

  if (message) return res.status(401).json({ message });

  res.status(200).json(result);
};

module.exports = {
  getAllBlogPosts,
};
