import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-produto.component.html'
})
export class CadastroProdutoComponent {
  novoProduto = {
    nome: '',
    descricao: '',
    preco: 0,
    imagem_url: '',
    disponivel: true
  };

  private http = inject(HttpClient);
  private router = inject(Router);

  salvarProduto() {
    // Endereço do seu servidor Node.js que acessa o MySQL
    this.http.post('http://localhost:3000/produtos', this.novoProduto).subscribe({
      next: () => {
        alert('Manto cadastrado com sucesso! 🏆');
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao salvar. Verifique se o terminal do BACKEND está rodando!');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}