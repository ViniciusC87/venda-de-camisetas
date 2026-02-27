import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../../services/produto';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-produto.component.html'
})
export class CadastrarProdutoComponent implements OnInit {
  produtos: any[] = [];
  filtro: string = ''; // Variável que vai guardar o que você digita na lupa
  
  produto: any = {
    nome: '',
    preco: 0,
    estoque: 0,
    imagem_url: '',
    disponivel: true
  };

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listarTodos().subscribe({
      next: (res: any) => this.produtos = res,
      error: (err) => console.error('Erro ao buscar produtos:', err)
    });
  }

  // ESSA É A FUNÇÃO QUE FAZ A LUPA FUNCIONAR:
  get produtosFiltrados() {
    return this.produtos.filter(p => 
      p.nome.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  salvar() {
    if (!this.produto.nome) {
      alert('Por favor, dê um nome ao manto!');
      return;
    }

    this.produtoService.create(this.produto).subscribe({
      next: () => {
        alert('Manto ' + this.produto.nome + ' cadastrado com estoque de ' + this.produto.estoque + '! ✅');
        this.carregarProdutos();
        this.resetarForm();
      },
      error: (err) => alert('Erro ao salvar no banco de dados.')
    });
  }

  private resetarForm() {
    this.produto = {
      nome: '',
      preco: 0,
      estoque: 0,
      imagem_url: '',
      disponivel: true
    };
  }
}