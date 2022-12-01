module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
  });

  user.associate = (models) => {
   user.hasMany(models.BlogPost, {
    as: 'blogPost',
    foreignKey: 'id',
   });
  } 

  return user;
};
