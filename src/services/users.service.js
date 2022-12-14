const { User } = require('../models');
const { createToken, validateToken } = require('../auth/jwtAuthentication');

const login = async (email, password) => {
  const result = await User.findOne({
    where: {
      email,
      password,
    },
  });

  if (result) {
    const token = createToken({ email });
    return { token };
  }

  return { message: 'Invalid fields' };
};

const postUser = async (userInfos) => {
  const { email } = userInfos;

  const user = await User.findOne({
    where: { email },
  });
  
  if (user) return { message: 'User already registered' };

  await User.create(userInfos);

  const token = createToken({ email });

  return { token };
};

const getAllUsers = async (authorization) => {
  const { message } = validateToken(authorization);

  if (message) return { message };

  let result = await User.findAll();

  result = result.map(({ id, displayName, email, image }) => ({ id, displayName, email, image }));

  return { result };
};

const getUser = async (id, authorization) => {
  const { message } = validateToken(authorization);

  if (message) return { message };

  let result = await User.findByPk(id);

  if (!result) return { message: 'User does not exist' };

  const { password: _, ...resultNoPassword } = result.dataValues;

  result = resultNoPassword;

  return { result };
};

const deleteUser = async (authorization) => {
  const { result, message } = validateToken(authorization);
  
  if (message) return { message };
  
  const { email } = result;
  
  const user = await User.findOne({ where: { email } });

  await User.destroy({ where: { id: user.id } });

  return {};
};

module.exports = {
  login,
  postUser,
  getAllUsers,
  getUser,
  deleteUser,
};
