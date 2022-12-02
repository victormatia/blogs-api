const { BlogPost, User, Category } = require('../models');
const { validateToken } = require('../auth/jwtAuthentication');

const getAllBlogPosts = async (authorization) => {
  const { message } = validateToken(authorization);

  if (message) return { message };

  const result = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { 
      model: Category,
      as: 'categories',
      attributes: { exclude: ['title'] },
    },
  ] });

  return { result };  
};

module.exports = {
  getAllBlogPosts,
};
