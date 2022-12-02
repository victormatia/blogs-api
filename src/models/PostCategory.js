module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
  }
  );

  postCategory.associate = ({ BlogPost, Category }) => {
    Category.belongsToMany(BlogPost, {
      as: 'post',
      through: postCategory,
      foreignKey: 'id',
      otherKey: 'id'
    });
    
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'id',
      otherKey: 'id'
    });
  };

  return postCategory;
};
