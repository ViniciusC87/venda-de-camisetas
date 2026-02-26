import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './busca.component.html'
})
export class BuscaComponent implements OnInit {
  produtosFiltrados: Produto[] = [];
  termoBusca: string = '';

  private route = inject(ActivatedRoute);
  private produtoService = inject(ProdutoService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Monitora a URL para ver o que foi pesquisado na Home
    this.route.queryParams.subscribe(params => {
      this.termoBusca = params['q'] || '';
      this.buscarProdutos();
    });
  }

  buscarProdutos() {
    this.produtoService.listarTodos().subscribe({
      next: (dados) => {
        // Filtra os produtos pelo nome conforme o termo digitado
        this.produtosFiltrados = dados.filter(p => 
          p.nome.toLowerCase().includes(this.termoBusca.toLowerCase())
        ).map(p => ({ ...p, preco: Number(p.preco) }));
        
        this.cdr.detectChanges(); // Garante a atualização da tela
      },
      error: (err) => console.error('Erro ao buscar produtos:', err)
    });
  }
}