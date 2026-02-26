const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        try {
            // Pegando os dados que REALMENTE existem na sua migration
            const { nome, descricao, preco, imagem_url, disponivel } = req.body;

            await connection('produtos').insert({
                nome,
                descricao,
                preco,
                imagem_url,
                disponivel: disponivel !== undefined ? disponivel : true
            });

            return res.status(201).json({ message: 'Produto cadastrado com sucesso! 🏆' });
        } catch (error) {
            console.error("Erro ao inserir:", error.sqlMessage);
            return res.status(500).json({ 
                error: 'Erro ao cadastrar produto',
                detalhe: error.sqlMessage 
            });
        }
    },

    async getAll(req, res) {
        try {
            const produtos = await connection('produtos').select('*');
            return res.json(produtos);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    }
};