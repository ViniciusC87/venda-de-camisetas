import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './pagamento.component.html'
})
export class PagamentoComponent {
  metodoSelecionado: string = 'pix'; // Começa com PIX por padrão
  codigoPix = '00020126330014BR.GOV.BCB.PIX0111vinicamisas2026';
  
  cartao = {
    numero: '',
    nome: '',
    validade: '',
    cvv: ''
  };

  copiarPix() {
    navigator.clipboard.writeText(this.codigoPix);
    alert('Código PIX copiado com sucesso! 📋');
  }

  confirmarPagamento() {
    const metodo = this.metodoSelecionado.toUpperCase();
    alert(`Sucesso! Seu pagamento via ${metodo} está sendo processado. 🎉`);
    // Aqui você poderia redirecionar para uma página de "Obrigado"
  }
}