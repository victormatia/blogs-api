module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    sequelize,
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false,
  }
  );

  postCategory.associate = ({ BlogPost, Category }) => {
    Category.belongsToMany(BlogPost, {
      as: 'post',
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });
    
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });
  };

  return postCategory;
};
