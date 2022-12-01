const categoriesService = require('../services/categories.service');

const postCategory = async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;

  const { result, message } = await categoriesService.postCategory(name, authorization);

  if (message) return res.status(401).json({ message });

  res.status(201).json(result);
};

const getAllCategories = async (req, res) => {
  const { authorization } = req.headers;

  const { result, message } = await categoriesService.getAllCategories(authorization);

  if (message) return res.status(401).json({ message });

  res.status(200).json(result);
}; 

module.exports = {
  postCategory,
  getAllCategories,
};
