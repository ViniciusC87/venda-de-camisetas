require('dotenv').config();

module.exports = {

  // CONFIGURAÇÃO PARA SEU PC (LOCALHOST)
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '', // coloque sua senha local se tiver
      database: 'venda_camisetas'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },

  // CONFIGURAÇÃO PARA O SITE ONLINE (POSTGRES NA VERCEL)
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.POSTGRES_URL + "?sslmode=require",
    },
    migrations: {
      directory: './src/database/migrations'
    }
  }

};