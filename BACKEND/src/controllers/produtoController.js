const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        try {
            // Incluindo 'estoque' na desestruturação para o Admin poder enviar
            const { nome, descricao, preco, imagem_url, disponivel, estoque } = req.body;

            await connection('produtos').insert({
                nome,
                descricao,
                preco,
                imagem_url,
                // Adicionando a lógica de estoque: se não vier nada, assume 0
                estoque: estoque || 0,
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
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            // Adicionando 'estoque' aqui para o Admin poder editar a quantidade depois
            const { nome, descricao, preco, imagem_url, disponivel, estoque } = req.body;

            const resultado = await connection('produtos')
                .where('id', id)
                .update({
                    nome,
                    descricao,
                    preco,
                    imagem_url,
                    estoque, // Atualiza a quantidade de camisas no estoque
                    disponivel: disponivel !== undefined ? disponivel : true
                });

            if (resultado) {
                return res.json({ message: 'Manto atualizado com sucesso! 🔄' });
            } else {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            return res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    },

    // NOVA FUNÇÃO: Finalmente o Delete para limpar os clones!
    async delete(req, res) {
        try {
            const { id } = req.params;

            const resultado = await connection('produtos')
                .where('id', id)
                .delete();

            if (resultado) {
                return res.json({ message: 'Manto removido com sucesso! 🗑️' });
            } else {
                return res.status(404).json({ error: 'Manto não encontrado no banco de dados' });
            }
        } catch (error) {
            console.error("Erro ao deletar:", error);
            return res.status(500).json({ error: 'Erro interno ao tentar deletar o manto' });
        }
    }
};