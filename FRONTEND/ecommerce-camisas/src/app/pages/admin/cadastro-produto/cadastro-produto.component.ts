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
  // Objeto que será enviado para o MySQL via Node.js
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
    // Verificação básica antes de enviar
    if (!this.novoProduto.nome || !this.novoProduto.preco || !this.novoProduto.imagem_url) {
      alert('Por favor, preencha o nome, preço e a imagem! ⚠️');
      return;
    }

    // Endereço do seu servidor Node.js (Certifique-se que ele está rodando!)
    this.http.post('http://localhost:3000/produtos', this.novoProduto).subscribe({
      next: () => {
        alert('Manto cadastrado com sucesso! 🏆');
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error('Erro na conexão:', err);
        alert('Erro ao salvar. Verifique se o terminal do BACKEND está aberto e rodando!');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}