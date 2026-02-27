import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  termoPesquisa: string = '';
  mostrarLogin = false;
  adminEmail = '';
  adminSenha = '';
  produtos: any[] = [];

  private router = inject(Router);
  private produtoService = inject(ProdutoService);

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listarTodos().subscribe({
      next: (res: any) => this.produtos = res,
      error: (err) => console.error('Erro ao carregar produtos na home', err)
    });
  }

  irParaBusca() {
    if (this.termoPesquisa.trim()) {
      this.router.navigate(['/busca'], {
        queryParams: { q: this.termoPesquisa }
      });
    }
  }

  autenticarAdmin() {
    if (
      this.adminEmail === 'admin@vinistore.com' &&
      this.adminSenha === '123456'
    ) {
      this.mostrarLogin = false;
      this.router.navigate(['/admin/cadastrar-produto']);
    } else {
      alert('Acesso negado!');
    }
  }
}