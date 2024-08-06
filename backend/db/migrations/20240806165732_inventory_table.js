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

exports.up = function (knex) {
  return knex.schema.createTable('inventory', function (table) {
    table.increments('id').primary();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('item_name').notNullable();
    table.string('description').notNullable();
    table.integer('quantity').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('inventory');
};
