
exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.increments('id').primary();

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
}
