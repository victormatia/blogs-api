const { checksFields } = require('./validations');

const checksLoginFields = (req, res, next) => {
  const { body } = req;

  const areValidFields = checksFields(['email', 'password'], Object.keys(body));

  if (!areValidFields || !(body.email.length) || !(body.password.length)) {
    return res.status(400).json({ message: 'Some required fields are missing' }); 
  }

  next();
};

const checksUserRegistrationFields = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  const isValideEmail = emailRegex.test(email);
  const isValidName = displayName.length < 8;
  const isValidPass = password.length < 6;
  
  if (isValidName) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' }); 
  }

  if (!isValideEmail) return res.status(400).json({ message: '"email" must be a valid email' }); 

  if (isValidPass) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' }); 
  }

  next();
};

const checkGetUserAuthorization = (req, res, next) => { // mudar o nome para 'checksFieldAuthorization'
  const { headers } = req;

  const areValidFields = checksFields(['authorization'], Object.keys(headers));

  if (!areValidFields || !(headers.authorization.length)) {
    return res.status(401).json({ message: 'Token not found' }); 
  }

  next();
};

const checkNameField = (req, res, next) => {
  const { body } = req;

  const areValidFields = checksFields(['name'], Object.keys(body));

  if (!areValidFields) {
    return res.status(400).json({ message: '"name" is required' }); 
  }

  next();
};

const checkNewPostFields = (req, res, next) => {
  const { body } = req;

  const areValidFields = checksFields(['title', 'content', 'categoryIds'], Object.keys(body));

  if (
      !areValidFields
      || !(body.title.length)
      || !(body.content.length)
      || !(body.categoryIds.length)
    ) {
    return res.status(400).json({ message: 'Some required fields are missing' }); 
  }

  next();
};

module.exports = {
  checksLoginFields,
  checksUserRegistrationFields,
  checkGetUserAuthorization,
  checkNameField,
  checkNewPostFields,
};
