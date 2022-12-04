module.exports = (seqielize, DataTypes) => {
  const blogPost = seqielize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, 
  {
    seqielize,
    underscored: true,
    timestamps: false,
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    })
  };

  return blogPost;
};
