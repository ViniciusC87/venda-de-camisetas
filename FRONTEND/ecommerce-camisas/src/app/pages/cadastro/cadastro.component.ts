import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent {
  // Objeto que vai guardar os dados do formulário
  cliente = {
    nome: '',
    email: '',
    endereco: ''
  };

  private http = inject(HttpClient);
  private router = inject(Router);

  finalizarPedido() {
    // Aqui você enviaria para uma rota de "pedidos" no seu Node.js
    // Por enquanto, vamos simular o sucesso e levar para o pagamento
    console.log('Dados do Cliente:', this.cliente);
    alert('Cadastro realizado com sucesso! Vamos ao pagamento.');
    this.router.navigate(['/pagamento']);
  }
}