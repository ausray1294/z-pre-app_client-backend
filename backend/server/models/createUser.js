const knex = require('knex')(require('../../knexfile').development);
const bcrypt = require('bcrypt');

const createUser = async (data) => {
  const { first_name, last_name, username, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10);


  const results = {first_name, last_name, username, hashedPassword }
  return results
};

module.exports = {
  createUser,
};
