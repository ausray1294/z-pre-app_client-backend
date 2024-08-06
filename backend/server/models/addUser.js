const knex = require('knex')(require('../../knexfile').development);
const bcrypt = require('bcrypt');

const addUser = async (first_name, last_name, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await knex('users').insert({
    first_name: first_name,
    last_name: last_name,
    username: username,
    password: hashedPassword,
  });
  
};

module.exports = {
  findUserByUsername,
};
