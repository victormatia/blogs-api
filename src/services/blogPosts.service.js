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
  postBlogPost,
  getAllBlogPosts,
};