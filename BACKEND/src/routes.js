const express = require('express');
const routes = express.Router();

const pedidoController = require('./controllers/pedidoController');
const produtoController = require('./controllers/produtoController');
const userController = require('./controllers/userController');
const auth = require('./middlewares/auth');

// Rotas de Usuários
routes.post('/usuarios', userController.create);
routes.get('/usuarios', userController.getAll);

// Rotas de Produtos
routes.get('/produtos', produtoController.getAll);
routes.post('/produtos', auth, produtoController.create);
routes.put('/produtos/:id', auth, produtoController.update); 

// NOVA ROTA: Adicionada para permitir a exclusão de mantos (Clones)
routes.delete('/produtos/:id', auth, produtoController.delete);

// Rotas de Pedidos
routes.post('/pedidos', pedidoController.create);
routes.get('/pedidos', pedidoController.getAll);

module.exports = routes;