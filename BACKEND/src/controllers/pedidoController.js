const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        try {
            const data = req.body;
            const result = await connection('pedidos').insert({
                ...data,
                status: 'pendente'
            });
            return res.status(201).json({ message: 'Pedido realizado!', id: result[0] });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar pedido' });
        }
    },

    async getAll(req, res) {
        try {
            const pedidos = await connection('pedidos').select('*');
            return res.json(pedidos);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar pedidos' });
        }
    }
};