import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent {

  senha: string = '';

  constructor(private router: Router) {}

  login(): void {
    if (this.senha === 'admin123') {
      localStorage.setItem('admin_token', 'admin123');
      this.router.navigate(['/admin/cadastrar-produto']);
    } else {
      alert('Senha incorreta!');
    }
  }

}