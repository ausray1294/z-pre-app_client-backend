const userLogin = require('../models/userLogin')

const User = require('../../db/data/users');

async function getAllUsers(req, res) {
  const all = await User.all();
  return res.json(all);
}

async function getUser(req, res) {
  const user = await User.get(req.params.id);
  return res.send(user);
}

async function createUser(req, res) {
  // validation JOI
  const user = await User.getByUsername(req.body.username);
  if (!user) {
    const created = await User.create({ ...req.body });
    return res.json(created);
  } else {
    return res.status(409).json({ message: 'user already exists' });
  }
}

async function loginUser(req, res) {
  // validation JOI
  const user = await User.getByUsername(req.body.username);
  if (!user) {
    const loggedIn = await userLogin({ ...req.body });
    return res.json(loggedIn);
  } else {
    return res.status(409).json({ message: 'user already exists' });
  }
}


module.exports = {
  getAllUsers,
  getUser,
  createUser,
  loginUser
}