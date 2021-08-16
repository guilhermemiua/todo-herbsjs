exports.up = async function (knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id').primary();
    table.string('description');
    table.boolean('is_finished');
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('todos');
};
