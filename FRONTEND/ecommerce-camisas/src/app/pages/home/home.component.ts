import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { CarrinhoService } from '../../services/carrinho.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  produtosDestaque: Produto[] = [];
  
  private produtoService = inject(ProdutoService);
  private cdr = inject(ChangeDetectorRef);
  private carrinhoService = inject(CarrinhoService);

  ngOnInit(): void {
    // Buscamos os produtos do seu banco para mostrar na Home
    this.produtoService.listarTodos().subscribe({
      next: (dados) => {
        this.produtosDestaque = dados.slice(0, 4).map(p => ({
          ...p,
          preco: Number(p.preco)
        }));
        this.cdr.detectChanges(); // Essencial para o modo Zoneless
      },
      error: (err) => console.error('Erro ao carregar Home:', err)
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionar(produto);
    alert(`${produto.nome} foi para o seu carrinho! 🛒`);
  }
}