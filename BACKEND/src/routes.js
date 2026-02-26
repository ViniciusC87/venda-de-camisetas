const express = require('express');
const routes = express.Router();

const pedidoController = require('./controllers/pedidoController');
const produtoController = require('./controllers/produtoController');
const userController = require('./controllers/userController');
const auth = require('./middlewares/auth');

routes.post('/usuarios', userController.create);
routes.get('/usuarios', userController.getAll);

routes.get('/produtos', produtoController.getAll);
routes.post('/produtos', auth, produtoController.create);

routes.post('/pedidos', pedidoController.create);
routes.get('/pedidos', pedidoController.getAll);

module.exports = routes;