require ('dotenv').config();
// requerendo as ferramentas do dotenv e asusando para traduzir informações do banco de dados
// para o back-end
module.exports = {
// informa que a informações a seguir seram usadas para que se de a conexão entre banco de dados e back-end
  development: {
    client: 'mysql2',
// escolha do banco de dados
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
//dados de conexão vindas do .env
    },
    migrations: {
      // diretório onde serão criados os arquivos de estruturação das tabelas
      // Adicionamos o ./src/ para que o Knex encontre a pasta corretamente
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
    // configuração padrão para o Knex lidar com valores nulos
  }
};