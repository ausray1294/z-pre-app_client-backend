const knex = require('knex')(require('../../knexfile').development)

const findUserByUsername = async (username) => {
  return await knex('users').where({username}).first()
}

module.exports = {
  findUserByUsername
}