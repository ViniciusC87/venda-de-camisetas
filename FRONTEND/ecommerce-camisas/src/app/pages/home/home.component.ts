import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  termoPesquisa: string = '';
  mostrarLogin = false;
  adminEmail = '';
  adminSenha = '';

  private router = inject(Router);

  irParaBusca() {
    if (this.termoPesquisa.trim()) {
      // Navega para a página de busca passando o termo como parâmetro
      this.router.navigate(['/busca'], { queryParams: { q: this.termoPesquisa } });
    }
  }

  abrirLoginAdmin() {
    this.mostrarLogin = true;
  }

  autenticarAdmin() {
    if (this.adminEmail === 'admin@vinistore.com' && this.adminSenha === '123456') {
      this.mostrarLogin = false;
      this.router.navigate(['/admin/cadastrar-produto']);
    } else {
      alert('Acesso negado!');
    }
  }
}