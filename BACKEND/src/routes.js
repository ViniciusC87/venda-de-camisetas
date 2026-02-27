const express = require('express');
// instanciando o framework express dentro da variavel express
const routes = express.Router();
// instanciando a ferramenta Router vindo do framework express que é responsável por criar o "mapa de caminhos" do servidor. 
// Ele organiza as rotas (como GET e POST) em um arquivo separado para não bagunçar o arquivo principal (server.js).

const pedidoController = require('./controllers/pedidoController');
// estanciando o arquivo pedidoController 
const produtoController = require('./controllers/produtoController');
// estanciando o arquivo produtoController
const userController = require('./controllers/userController');
// estanciando o arquivo userController
const auth = require('./middlewares/auth');
//estanciando o arquivo auth

// Rotas de Usuários
routes.post('/usuarios', userController.create);
// estou pegando a variavel estanciada routes e com o comando post informo que quando acesso o endereço na url '/usuarios'
// vamos entrar no controller user para criação de um usuario

routes.get('/usuarios', userController.getAll);
// estou pegando a variavel estanciada routes e com o comando get informo que quando acesso o endereço na url '/usuarios'
// vamos entrar no controller get para listar ou ler um usuario

// Rotas de Produtos
routes.get('/produtos', produtoController.getAll);
// estou pegando a variavel estanciada routes e com o comando get informa que quando acesso o endereço na url '/produtos'
// vamos entrar no controller produtos para ler ou listar um produto
routes.post('/produtos', auth, produtoController.create);
// estou pegando a variavel estanciada routes e com o comando post informo que quando acesso o endereço na url '/produtos'
// vamos entrar no controller produtos para criação de um produto
routes.put('/produtos/:id', auth, produtoController.update); 
// estou pegando a variavel estanciada routes e com o comando put informo que quando acesso o endereço na url '/produtos'
// vamos entrar no controller produtos para editar um produto

// NOVA ROTA: Adicionada para permitir a exclusão de mantos (Clones)
routes.delete('/produtos/:id', auth, produtoController.delete);
// estou pegando a variavel estanciada routes e com o comando delete informo que quando acesso o endereço na url '/produtos'
// vamos entrar no controller produtos para deletar um produto

// Rotas de Pedidos
routes.post('/pedidos', pedidoController.create);
// estou pegando a variavel estanciada routes e com o comando post informo que quando acesso o endereço na url '/pedidos'
// vamos entrar no controller pedidos para criação de um novo pedido
routes.get('/pedidos', pedidoController.getAll);
// estou pegando a variavel estanciada routes e com o comando get informo que quando acesso o endereço na url '/pedidos'
// vamos entrar no controller pedidos para ler ou listar um pedido

// NOVA ROTA: Para atualizar o status do pedido (Gera a baixa no estoque)
routes.put('/pedidos/:id/status', auth, pedidoController.updateStatus);

module.exports = routes;
// deixando essen arquivo disponivel para exporta para outras pastas