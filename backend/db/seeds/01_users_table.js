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
const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  const saltValue = await bcrypt.genSalt(10);
  const ahashedPassword = await bcrypt.hash('a', saltValue);
  const bhashedPassword = await bcrypt.hash('b', saltValue);
  const chashedPassword = await bcrypt.hash('c', saltValue);
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      first_name: 'a',
      last_name: 'a',
      username: 'a',
      password: ahashedPassword,
    },
    {
      first_name: 'b',
      last_name: 'b',
      username: 'b',
      password: bhashedPassword,
    },
    {
      first_name: 'c',
      last_name: 'c',
      username: 'c',
      password: chashedPassword,
    },
  ]);
};
