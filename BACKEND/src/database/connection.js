const knex = require('knex');
// estanciando o knex
const configuration = require('../../knexfile');

const connection = knex(configuration.development);
//'configuration' carrega o ARQUIVO TODO. Ao usar '.development', eu estou APONTANDO o dedo para uma parte específica 
//dizendo: "Knex, ignora o resto e usa SÓ essas instruções aqui!".É a filtragem que faz o Banco de Dados saber que 
// deve rodar no meu PC (Localhost).
module.exports = connection;
// Exportamos a conexão para usar nos Controllers (Produtos e Checkout)
