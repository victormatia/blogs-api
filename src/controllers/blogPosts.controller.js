const blogPostService = require('../services/blogPosts.service');

const postBlogPost = async (req, res) => {
  const { authorization } = req.headers;
  const { body } = req;

  const { result, message } = await blogPostService.postBlogPost(authorization, body);

  if (
      message
      && message === 'one or more "categoryIds" not found'
    ) return res.status(400).json({ message });
  if (message) return res.status(401).json({ message });

  res.status(201).json(result);
}; 

const getAllBlogPosts = async (req, res) => {
  const { authorization } = req.headers;

  const { result, message } = await blogPostService.getAllBlogPosts(authorization);

  if (message) return res.status(401).json({ message });

  res.status(200).json(result);
};

const getBlogPostById = async (req, res) => {
  console.log('getOne');

  const { authorization } = req.headers;
  const { id } = req.params;

  const { result, message } = await blogPostService.getBlogPostById(authorization, id);

  if (message && message === 'Post does not exist') return res.status(404).json({ message });
  if (message) return res.status(401).json({ message });

  res.status(200).json(result);
};

const findPostByTerm = async (req, res) => {
  console.log('findoByTerm');
  const { q } = req.query;
  const { authorization } = req.headers;

  const { result, message } = await blogPostService.findPostByTerm(authorization, q);

  if (message) return res.status(401).json({ message });

  res.status(200).json(result);
};

const uptadePost = async (req, res) => {
  const { authorization } = req.headers;
  const { body } = req;
  const { id } = req.params;

  const { result, message } = await blogPostService.uptadePost(authorization, id, body);

  if (message) return res.status(401).json({ message });

  res.status(200).json(result);
};

const deletePost = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const { result, message } = await blogPostService.deletePost(authorization, id);

  if (message && message === 'Post does not exist') return res.status(404).json({ message });
  if (message) return res.status(401).json({ message });

  res.status(204).json(result);
};

module.exports = {
  postBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  uptadePost,
  deletePost,
  findPostByTerm,
};
