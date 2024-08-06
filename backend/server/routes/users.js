const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
const knex = require('knex')(require('../../knexfile').development);
const { findUserByUsername } = require('../models/findUserByUsername');
const { addUser } = require('../models/addUser');
const { userLogin } = require('../models/userLogin');

router.get('/', (req, res) => {
  knex('users')
    .select('*')
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({ message: 'Users could not be found' }),
    );
});

router.post('/', async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  console.log(`received request to make an acount`);

  try {
    const existingUser = await findUserByUsername(username);

    existingUser
      ? console.log(`Username: ${username} already exist`)
      : await addUser(first_name, last_name, username, password);

    console.log(`Username: ${username} was made successfully`);
    res.status(201).json({ data });
  } catch (err) {
    res.status(503).json({ message: 'Error creating user. Please try again' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received login request for ${username}`);

  try {
    const user = await findUserByUsername(username);

    !user
      ? res.status(400).json({ message: 'Invalid username or password' })
      : await userLogin(username, password);
  } catch (err) {
    console.log('Error during authentication');
    res.status(500).json({ message: 'Server Error' });
  }
});
