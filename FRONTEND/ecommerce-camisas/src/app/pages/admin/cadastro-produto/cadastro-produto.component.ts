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
  token = 'SEU_TOKEN_AQUI';
  editando = false;

  produto: any = {
    id: null,
    nome: '',
    preco: 0,
    estoque: 0,
    imagem_url: '',
    disponivel: true
  };

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listarTodos().subscribe({
      next: (res: any) => this.produtos = res,
      error: (err) => console.error(err)
    });
  }

  get produtosFiltrados() {
    return this.produtos.filter(p =>
      p.nome?.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  salvar(): void {

    if (!this.produto.nome) {
      alert('Dê um nome ao manto!');
      return;
    }

    if (this.editando) {
      this.produtoService
        .atualizar(this.produto.id, this.produto, this.token)
        .subscribe(() => {
          alert('Manto atualizado! 🔄');
          this.carregarProdutos();
          this.resetarForm();
        });

    } else {
      this.produtoService
        .create(this.produto, this.token)
        .subscribe(() => {
          alert('Manto cadastrado! ✅');
          this.carregarProdutos();
          this.resetarForm();
        });
    }
  }

  editar(p: any): void {
    this.produto = { ...p };
    this.editando = true;
  }

  excluir(id: number): void {
    if (confirm('Deseja mesmo apagar esse manto?')) {
      this.produtoService.excluir(id, this.token)
        .subscribe(() => this.carregarProdutos());
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Selecione apenas imagens.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.produto.imagem_url = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  removerImagem(): void {
    this.produto.imagem_url = '';
  }

  private resetarForm(): void {
    this.produto = {
      id: null,
      nome: '',
      preco: 0,
      estoque: 0,
      imagem_url: '',
      disponivel: true
    };
    this.editando = false;
  }
}