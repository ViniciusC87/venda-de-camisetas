import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoService } from './services/produto';
import { CarrinhoService } from './services/carrinho.service';
import { Produto } from './models/produto.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.html',
})
export class AppComponent implements OnInit {

  produtos: Produto[] = [];
  itensCarrinho: Produto[] = [];

  private produtoService = inject(ProdutoService);
  private cdr = inject(ChangeDetectorRef); // Importante para o modo Zoneless
  carrinhoService = inject(CarrinhoService);

  ngOnInit(): void {
    this.produtoService.listarTodos().subscribe({
      next: (dados: any[]) => {
        console.log('📦 DADOS QUE CHEGARAM DO BANCO:', dados);
        this.produtos = dados.map(produto => ({
          ...produto,
          preco: Number(produto.preco)
        }));
        
        // Avisa ao Angular para atualizar o HTML agora que os dados chegaram
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('❌ ERRO NA REQUISIÇÃO:', err);
      }
    });

    this.carrinhoService.itens$.subscribe((itens: Produto[]) => {
      this.itensCarrinho = itens;
      this.cdr.detectChanges(); // Atualiza o carrinho também
    });
  }

  adicionar(produto: Produto): void {
    this.carrinhoService.adicionar(produto);
  }

  get total(): number {
    return this.itensCarrinho.reduce(
      (soma, item) => soma + Number(item.preco),
      0
    );
  }
}