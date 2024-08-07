// const userLogin = require('../models/userLogin');
const bcrypt = require('bcryptjs');
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
    const saltValue = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltValue);
    const created = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    return res.json(created);
  } else {
    return res.status(409).json({ message: 'user already exists' });
  }
}

async function loginUser(req, res) {
  // validation JOI
  const user = await User.getByUsername(req.body.username);
  console.log(
    `Passed in password:${req.body.password} & ${user.username}:${user.password} are being compared`,
  );
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password,
    (err, result) => {
      if (err) {
        // Handle error
        console.error('Error comparing passwords:', err);
        return;
      }

      if (result) {
        console.log('Passwords match! User authenticated.');
      } else {
        console.log('Passwords do not match! Authentication failed.');
      }
    },
  );
  if (isPasswordMatch) {
    console.log('Passwords match! User logged in.');
    return res.status(200).json({ message: 'User logged in', user });
  } else {
    return res.status(409).json({ message: 'Passwords do not match!' });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  loginUser,
};
