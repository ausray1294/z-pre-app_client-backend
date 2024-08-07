const knex = require('knex')(require('../../knexfile').development);
const bcrypt = require('bcrypt');

const userLogin = async (...data) => {
  const user = await knex('users').where({ username }).first()
  const comparePasswords = await bcrypt.compare(password, user.password);

  if (!comparePasswords) {
    return res.status(400).json({ message: 'Invaidl username or password' });
  }
  res.status(200).json({ message: 'Login successful' });
};

module.exports = {
  userLogin,
};
