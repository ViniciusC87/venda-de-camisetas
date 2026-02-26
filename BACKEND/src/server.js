const express = require('express');
//estanciando express
const app = express();
// estanciando ferramentas dentro de app
const PORT = 3000;
// porta logica onde vamos trabalhar
const cors = require('cors'); // 1. Importa
app.use(cors());              // 2. Libera o acesso (coloque logo abaixo do express())
app.use(express.json());
// usar express para traduzir com a função json

const routes = require('./routes');
// Como o server.js e o routes.js agora estão na mesma pasta (src), 
// o './routes' funciona perfeitamente.

app.use(routes);
// usando as rotas configuradas no arquivo routes.js

app.listen(PORT,()=>{
// ligar meu servidor na port 3000
    console.log('🚀servidor ativo🚀');
});