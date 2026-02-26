import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BuscaComponent } from './pages/busca/busca.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component'; // Importe aqui

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'busca', component: BuscaComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'pagamento', component: PagamentoComponent }, // Rota final!
];