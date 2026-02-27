import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// O caminho correto para sair da pasta 'cadastro' e entrar em 'services'
import { ProdutoService } from '../../services/produto'; 

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cadastro.component.html',
  providers: [ProdutoService]
})
export class CadastroComponent {
  
  // Objeto que o HTML usa para preencher os campos
  produto: any = {
    nome: '',
    descricao: '',
    preco: 0,
    imagem_url: '',
    estoque: 0, 
    disponivel: true
  };

  constructor(private produtoService: ProdutoService) {}

  salvar() {
    console.log('Enviando para o servidor:', this.produto);
    
    this.produtoService.create(this.produto).subscribe({
      next: (res) => {
        alert('Manto ' + this.produto.nome + ' cadastrado com estoque de ' + this.produto.estoque + '! ✅');
        // Reseta o formulário
        this.produto = { nome: '', descricao: '', preco: 0, imagem_url: '', estoque: 0, disponivel: true };
      },
      error: (err) => {
        console.error('Erro ao salvar:', err);
        alert('Erro ao cadastrar. Verifique se o seu BACKEND está ligado!');
      }
    });
  }
}