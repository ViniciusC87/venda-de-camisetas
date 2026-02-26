const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        try {
            const { nome, email, senha, role } = req.body;
            const result = await connection('usuarios').insert({
                nome,
                email,
                senha,
                role: role || 'cliente'
            });
            return res.status(201).json({ id: result[0], nome });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    },

    async getAll(req, res) {
        try {
            const usuarios = await connection('usuarios').select('*');
            return res.json(usuarios);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar usuários' });
        }
    }
};