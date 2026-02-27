export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem_url: string;
  estoque: number; // <-- ADICIONADO: Agora o Angular aceita o número do estoque
  disponivel: boolean;
}