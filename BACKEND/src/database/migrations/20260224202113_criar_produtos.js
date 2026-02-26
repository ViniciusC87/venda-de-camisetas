/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('produtos', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();        // Ex: Camisa Titular 2026
    table.string('descricao');                 // Ex: Tecido dry-fit, patch bordado
    table.decimal('preco', 10, 2).notNullable(); // 10 dígitos no total, 2 após a vírgula
    table.string('imagem_url');                // Link da foto da camisa
    table.boolean('disponivel').defaultTo(true); 
    
    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('produtos');
};