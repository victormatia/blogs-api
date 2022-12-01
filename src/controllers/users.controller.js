const usersService = require('../services/users.service');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { token, message } = await usersService.login(email, password);

  if (message) return res.status(400).json({ message });

  res.status(200).json({ token });
};

const postUser = async (req, res) => {
  const { body } = req;

  const { token, message } = await usersService.postUser(body);

  if (message) return res.status(409).json({ message });

  res.status(201).json({ token });
};

const getAllUsers = async (req, res) => {
  const { authorization } = req.headers;
  
  const { result, message } = await usersService.getAllUsers(authorization);

  if (message) return res.status(401).json({ message });

  res.status(200).json(result);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const { result, message } = await usersService.getUser(id, authorization);
  
  if (message && message !== 'Expired or invalid token') return res.status(404).json({ message });
  
  if (message) return res.status(401).json({ message });

  res.status(200).json(result);
};

module.exports = {
  login,
  postUser,
  getAllUsers,
  getUser,
};
