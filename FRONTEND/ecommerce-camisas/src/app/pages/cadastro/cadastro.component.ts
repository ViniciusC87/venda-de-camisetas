import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cadastro.component.html',
  providers: [ProdutoService]
})
export class CadastroComponent implements OnInit {

  produtos: any[] = [];

  editando = false;

  produto: any = {
    id: null,
    nome: '',
    descricao: '',
    preco: 0,
    imagem_url: '',
    estoque: 0,
    disponivel: true
  };

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listarTodos().subscribe(res => {
      this.produtos = res;
    });
  }

  // 🔥 FUNÇÃO PARA SELECIONAR IMAGEM
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.produto.imagem_url = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  salvar() {
    if (this.editando) {
      this.produtoService.atualizar(this.produto.id, this.produto)
        .subscribe(() => {
          alert('Produto atualizado! 🔄');
          this.resetar();
          this.carregarProdutos();
        });
    } else {
      this.produtoService.create(this.produto)
        .subscribe(() => {
          alert('Produto cadastrado! ✅');
          this.resetar();
          this.carregarProdutos();
        });
    }
  }

  editar(p: any) {
    this.produto = { ...p };
    this.editando = true;
  }

  excluir(id: number) {
    this.produtoService.excluir(id).subscribe(() => {
      alert('Produto excluído ❌');
      this.carregarProdutos();
    });
  }

  resetar() {
    this.produto = {
      id: null,
      nome: '',
      descricao: '',
      preco: 0,
      imagem_url: '',
      estoque: 0,
      disponivel: true
    };
    this.editando = false;
  }
}