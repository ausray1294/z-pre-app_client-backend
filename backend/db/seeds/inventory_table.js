/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/*
id:id
user_id: fK
item_name
description
quantity
*/

//need to make sure this awaits users

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('inventory').del();

  const users = await knex('users');
  // .select('id');

  await knex('inventory').insert([
    {
      user_id: users[0].id,
      item_name: 'Boxers',
      description:
        'asdfasdfasdfasdfasdfasdfasdfadsfasdfasdfaasdfasdfasdfasdfasdfasdfasdfasdfasdfaedsfasdfasdfsdfsdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfmsadfkkasdfalksdfklldlkflkasdjflklaksdfjasdfjkljsdfkljasdklflasdjfkasdjfklasdjflkasdjfkladsjfklasdjfklj',
      quantity: 10,
    },
    {
      user_id: users[1].id,
      item_name: 'Apachee Helicopter',
      description: 'It go BrBrBrBr',
      quantity: 1,
    },
    {
      user_id: users[2].id,
      item_name: 'Uniforms',
      description: 'This item allows the ants to go marching along',
      quantity: 3,
    },
  ]);
};
