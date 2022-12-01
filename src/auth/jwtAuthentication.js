const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '15min',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const validateToken = (token) => {
  try {
    const result = jwt.verify(token, secret);
    return { result };
  } catch (error) {
    return { message: 'Expired or invalid token' };
  }
};

module.exports = {
  createToken,
  validateToken,
};
