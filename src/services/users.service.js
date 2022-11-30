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

module.exports = {
  login,
};
