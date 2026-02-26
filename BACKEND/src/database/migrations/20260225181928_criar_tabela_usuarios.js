exports.up = function(knex) {
  return knex.schema.createTable('usuarios', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable().unique();
    table.string('senha').notNullable();
    table.string('role').notNullable().defaultTo('cliente'); // 'admin' ou 'cliente'
    table.timestamps(true, true); // Cria created_at e updated_at automaticamente
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios');
};