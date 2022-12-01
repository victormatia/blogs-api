const { Category } = require('../models');
const { validateToken } = require('../auth/jwtAuthentication');

const postCategory = async (name, authorization) => {
  const { message } = validateToken(authorization);

  if (message) return { message };

  const result = await Category.create({ name });

  return { result };
};

const getAllCategories = async (authorization) => {
  const { message } = validateToken(authorization);

  if (message) return { message };

  const result = await Category.findAll();

  return { result };
};

module.exports = {
  postCategory,
  getAllCategories,
};