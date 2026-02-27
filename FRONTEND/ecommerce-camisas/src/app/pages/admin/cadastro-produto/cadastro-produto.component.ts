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
  filtro: string = '';
  // SEU TOKEN SALVO
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzY0Njk4OTE2LCJleHAiOjE3NjUzMDM3MTZ9.h7NqR__ufGA7huy-11HoslOj_0yHgVABZnkhF2J04ao';

  produto: any = { nome: '', preco: 0, estoque: 0, imagem_url: '', disponivel: true };

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

  get produtosFiltrados() {
    return this.produtos.filter(p => p.nome.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  salvar() {
    if (!this.produto.nome) { return alert('Dê um nome ao manto!'); }
    
    this.produtoService.create(this.produto, this.token).subscribe({
      next: () => {
        alert('Manto cadastrado! ✅');
        this.carregarProdutos();
        this.resetarForm();
      },
      error: () => alert('Erro ao salvar. Verifique o console.')
    });
  }

  excluir(id: number) {
    if (confirm('Deseja mesmo apagar esse manto?')) {
      this.produtoService.excluir(id, this.token).subscribe({
        next: () => {
          alert('Removido com sucesso! 🗑️');
          this.carregarProdutos();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao excluir! Verifique se você está logado.');
        }
      });
    }
  }

  private resetarForm() {
    this.produto = { nome: '', preco: 0, estoque: 0, imagem_url: '', disponivel: true };
  }
}