const { Op } = require('sequelize');
const { BlogPost, User, Category, sequelize, PostCategory } = require('../models');
const { validateToken } = require('../auth/jwtAuthentication');

const transactions = async (title, content, categoryIds, result) => (
  sequelize.transaction(async (t) => {
    const user = await User.findOne({ where: { email: result.email } });

    const newPost = await BlogPost.create(
      { userId: user.id, title, content }, { transaction: t },
    );

    const postCategories = await Promise.all(
      categoryIds.map(async (categoryId) => PostCategory.create(
          { postId: newPost.id, categoryId },
          { transaction: t },
        )),
    );
    
    return { newPost, postCategories };
  })
);

const postBlogPost = async (authorization, { title, content, categoryIds }) => {
  const { result, message } = validateToken(authorization);

  if (message) return { message };

  const allCategories = await Category.findAll();
  
  const areValidsCategories = categoryIds.every((id, i) => allCategories[i].id === id);

  if (!areValidsCategories) return { message: 'one or more "categoryIds" not found' };

  const t = await transactions(title, content, categoryIds, result);
  
  const post = await BlogPost.findByPk(t.newPost.id);

  return { result: post };
};

const getAllBlogPosts = async (authorization) => {
  const { message } = validateToken(authorization);

  if (message) return { message };

  const result = await BlogPost.findAll({ include: [
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    { 
      model: Category,
      as: 'categories',
      attributes: { exclude: ['title'] },
    },
  ] });

  return { result };  
};

const getBlogPostById = async (authorization, id) => {
  const { message } = validateToken(authorization);

  if (message) return { message };

  const result = await BlogPost.findByPk(id, { include: [
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    { 
      model: Category,
      as: 'categories',
      attributes: { exclude: ['title'] },
    },
  ] });

  if (!result) return { message: 'Post does not exist' };

  return { result };  
};

const uptadePost = async (authorization, id, postUpdated) => {
  const { result, message } = validateToken(authorization);
  
  if (message) return { message };
  
  const { email } = result;
  
  const user = await User.findOne({ where: { email } });

  const postRequired = await BlogPost.findByPk(id);

  if (user.id !== postRequired.userId) return { message: 'Unauthorized user' };

  await BlogPost.update({ ...postUpdated }, { where: { id, userId: user.id } });

  const post = await BlogPost.findByPk(id, { include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', attributes: { exclude: ['title'] } },
  ] });

  return { result: post };
};

const deletePost = async (authorization, id) => {
  const { result, message } = validateToken(authorization);
  
  if (message) return { message };
  
  const { email } = result;
  
  const user = await User.findOne({ where: { email } });

  const postRequired = await BlogPost.findByPk(id);

  if (!postRequired) return { message: 'Post does not exist' };

  if (user.id !== postRequired.userId) return { message: 'Unauthorized user' };

  await BlogPost.destroy({ where: { id } });

  return {};
};

const findPostByTerm = async (authorization, term) => {
  const { message } = validateToken(authorization);
  
  if (message) return { message };

  const resultByTitle = await BlogPost.findAll({
    where: { title: { [Op.like]: `%${term}` } },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: { exclude: ['title'] } },
    ] });
  const resultByContent = await BlogPost.findAll({
    where: { content: { [Op.like]: `%${term}` } },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: { exclude: ['title'] } },
    ] });

  if (resultByTitle.length) return { result: resultByTitle };
  if (resultByContent.length) return { result: resultByContent };

  return { result: [] };
};

module.exports = {
  postBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  uptadePost,
  deletePost,
  findPostByTerm,
};
