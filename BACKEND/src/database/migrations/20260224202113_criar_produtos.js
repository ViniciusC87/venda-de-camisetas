exports.up = async function(knex) {
  await knex.schema.createTable('produtos', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('descricao');
    table.decimal('preco', 10, 2).notNullable();
    
    // 'longtext' é o segredo para a foto não quebrar
    table.text('imagem_url', 'longtext'); 
    
    table.boolean('disponivel').defaultTo(true); 
    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('produtos');
};