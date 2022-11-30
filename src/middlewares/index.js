const { checksFields } = require('./validations');

const checksLoginFields = (req, res, next) => {
  const { body } = req;

  const areValidFields = checksFields(['email', 'password'], Object.keys(body));

  if (!areValidFields || !(body.email.length) || !(body.password.length)) {
    return res.status(400).json({ message: 'Some required fields are missing' }); 
  }

  next();
};

module.exports = {
  checksLoginFields,
};
