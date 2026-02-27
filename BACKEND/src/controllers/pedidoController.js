const connection = require('../database/connection');
// estanciando o arquivo connection que esta na pasta database

module.exports = {
// estou deixando os controllers disponiveis para outros arquivos
    async create(req, res) {
// informando que esse é a logica de criação de pedidos, que ela é uma função assincrona que recebe e responde a requisições, 
// assincrona pq vai ao banco de dados gravar pedidos no banco de dados
        try {
// tratamento de excessão, try é igual a vamos tentar o comando a seguir
            const data = req.body;
// estanciando dentro da variavel data toda a requisição de criar pedido
            const result = await connection('pedidos').insert({
// pegou a "ferramenta" de conexão, apontou para a "gaveta" (tabela) de pedidos e mandou ela guardar o que você recebeu
//o uso do await é o momento que o sistema pode demorar um pouco por ter que ir ate o banco de dados pra gravar essa informação
                ...data,
// aqui abrevia os atributos usando o comando data(dados) que manda todos os dados da requisição para a tabela pedido
// ao inves de ter que declarar atributo por atributo, e o knex faz a triagem desses dados e os coloca nos atributos certos
                status: 'pendente'
// para um pedido novo sempre iniciar os status como pendente e não depender da informação status do cliente
            });
            return res.status(201).json({ message: 'Pedido realizado!', id: result[0] });
// se no tratamento de excesão, o que se espera acontecer, o sistema retorna  'Pedido realizado!'
        } catch (error) {
// tratamento de erro, caso aconteça algo e o try de algum erro, o sistema pula para essa função
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar pedido' });
// e manda essa mensagem para o usuario
        }
    },

    // NOVA FUNÇÃO: Atualizar status e dar baixa no estoque automaticamente
    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { novoStatus } = req.body; // 'pago', 'enviado', 'cancelado'

            // Buscamos o pedido para saber qual é o modelo da camisa (para baixar o estoque certo)
            const pedido = await connection('pedidos').where('id', id).first();

            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }

            // LÓGICA DE ESTOQUE: Se o status mudar para 'pago', tiramos 1 do estoque do produto
            if (novoStatus === 'pago') {
                await connection('produtos')
                    .where('nome', pedido.modelo) 
                    .decrement('estoque', 1); // Comando mágico do Knex para subtrair
            }

            // Atualiza o status na tabela pedidos
            await connection('pedidos').where('id', id).update({ status: novoStatus });

            return res.json({ message: `Status do pedido ${id} atualizado para ${novoStatus}!` });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar status e estoque' });
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