import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarProdutoComponent } from './pages/admin/cadastro-produto/cadastro-produto.component';
import { BuscaComponent } from './pages/busca/busca.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'busca', 
    component: BuscaComponent 
  },
  { 
    path: 'cadastro', 
    component: CadastroComponent 
  },
  { 
    path: 'pagamento', 
    component: PagamentoComponent 
  },
  { 
    path: 'admin/cadastrar-produto', 
    component: CadastrarProdutoComponent 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];