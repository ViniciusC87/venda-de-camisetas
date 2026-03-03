require('dotenv').config();


const express = require('express');
// instanciando o framework express dentro da variavel express
const cors = require('cors'); 
//instanciando o framework cors na variavel cors
const routes = require('./routes');
// instanciando as logicas do arquivo routes na variavel routes

const app = express();
// estanciando as funcionalidades do variavel express(que tem nela o framework express) na variavel app
const PORT = process.env.PORT || 3000;
// informando que a porta logica que vamos trabalhar é a 3000

app.use(cors());
// estamos usando as funcionalidades do app(instaciado pelo express) e as usando para rodar a biblioteca cors(que a a biblioteca 
//que autoriza os acessos entre back e front) sem ele front e back não trocariam informações, como guarda algo no banco de dados
app.use(express.json({ limit: '10mb' }));
// o use() faz uso das função instanciadas na variavel app(express) para ligar o traduto entre front e back(express.json)
// e poem uma ressalva que pode ter informações que podem chegar ate 10mb, não mais que isso
app.use(express.urlencoded({ limit: '10mb', extended: true })); 
// use() esta chamando a variavel app(express) para ligar outro tradutor(express.urlencoded) que nesse caso faz a tradução de
//de dados vindos de formulários (pela URL). Ele também garante o limite de 10MB e o extended: true permite que o servidor 
//entenda dados mais complexos.

app.use(routes);
// use() esta chamando a variavel app(express) ligar-se ao arquivo routes que tem as rotas do site

app.listen(PORT, () => {
// usando as as funcionalidades da variavel instanciada app para rodar o que esta na port 3000
    console.log('🚀 Servidor ativo e aceitando imagens pesadas! 🚀');
});