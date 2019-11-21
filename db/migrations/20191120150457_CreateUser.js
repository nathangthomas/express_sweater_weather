
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.string('email');
      table.string('password');
      table.string('apiKey');
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropColumn('email');
      table.dropColumn('password');
      table.dropColumn('apiKey');
    })
  ]);
};
