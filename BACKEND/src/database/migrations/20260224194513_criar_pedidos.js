/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Usamos 'await' para garantir que a tabela seja criada antes de encerrar o processo
  await knex.schema.createTable('pedidos', (table) => {
    table.increments('id').primary(); 

    // --- VÍNCULO COM USUÁRIO ---
    // Importante: Como este arquivo roda antes de 'criar_tabela_usuarios', 
    // apenas criamos a coluna agora. A ligação (Foreign Key) a gente faz no banco depois, 
    // ou garantimos que a tabela de usuários exista primeiro.
    table.integer('user_id').unsigned().notNullable();

    // --- PERSONALIZAÇÃO ---
    table.string('modelo').notNullable(); // Titular, Reserva, 2ª Reserva
    table.string('tipo_manga').notNullable(); 
    table.string('nome_camisa').notNullable(); 
    table.integer('numero_camisa').notNullable(); 
    table.string('tamanho').notNullable();

    // --- ENTREGA ---
    table.string('nome_cliente').notNullable();
    table.string('email').notNullable();
    table.string('cep').notNullable();
    table.string('endereco').notNullable();
    table.string('numero_casa').notNullable();
    table.string('cidade').notNullable();

    // --- PAGAMENTO E STATUS ---
    table.string('forma_pagamento').notNullable(); 
    table.string('status').defaultTo('pendente'); 
    
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('pedidos');
};