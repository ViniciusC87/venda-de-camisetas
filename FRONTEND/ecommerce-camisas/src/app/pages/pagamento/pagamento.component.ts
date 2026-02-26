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
  metodoSelecionado: string = 'pix'; // Padrão começa no PIX
  codigoPix = '00020126330014BR.GOV.BCB.PIX0111vinicamisas2026';
  
  cartao = {
    numero: '',
    nome: '',
    validade: '',
    cvv: ''
  };

  copiarPix() {
    navigator.clipboard.writeText(this.codigoPix);
    alert('Código PIX copiado! 📋');
  }

  confirmarPagamento() {
    alert(`Pagamento via ${this.metodoSelecionado.toUpperCase()} processado com sucesso! 🎉`);
  }
}