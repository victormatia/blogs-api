const { User } = require('../models');
const { createToken } = require('../auth/jwtAuthentication');

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

const getAllUsers = async () => {
  const result = await User.findAll();

  return { result };
};

module.exports = {
  login,
  postUser,
  getAllUsers,
};
