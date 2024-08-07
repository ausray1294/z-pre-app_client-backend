/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/*
id:id
first_name
last_name
username
password

*/
const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  const hashedPassword = await bcrypt.hash('a123', 10);
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      first_name: 'a',
      last_name: 'a',
      username: 'a',
      password: hashedPassword,
    },
    {
      first_name: 'b',
      last_name: 'b',
      username: 'b',
      password: hashedPassword,
    },
    {
      first_name: 'c',
      last_name: 'c',
      username: 'c',
      password: hashedPassword,
    },
  ]);
};
