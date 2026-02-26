import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {
  produto: any = { nome: '', descricao: '', preco: 0, imagem_url: '', disponivel: true };
  listaProdutos: any[] = [];
  produtosFiltrados: any[] = []; 
  filtroNome: string = ''; 
  
  editando: boolean = false;
  produtoId: number | null = null;
  carregando: boolean = false;
  previewImagem: string | null = null; // Para mostrar a foto na hora

  private readonly API_URL = 'http://localhost:3000/produtos';
  private readonly TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzY0Njk4OTE2LCJleHAiOjE3NjUzMDM3MTZ9.h7NqR__ufGA7huy-11HoslOj_0yHgVABZnkhF2J04ao';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  // MÉTODO PARA O SEU SOBRINHO: Escolhe a foto, diminui o peso e mostra o preview
  aoSelecionarArquivo(event: any) {
    const arquivo = event.target.files[0];
    if (arquivo) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          // Criamos um canvas para diminuir o tamanho da imagem (compressão)
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const MAX_WIDTH = 400; // Tamanho ideal para web
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Transforma em uma imagem leve (JPEG com 50% de qualidade)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.5); 
          this.produto.imagem_url = dataUrl;
          this.previewImagem = dataUrl;
          this.cdr.detectChanges();
        };
      };
      reader.readAsDataURL(arquivo);
    }
  }

  carregarProdutos() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.TOKEN}`);
    this.http.get<any[]>(this.API_URL, { headers }).subscribe({
      next: (res) => {
        this.listaProdutos = res; 
        this.filtrarProdutos(); 
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error("Erro ao buscar:", err)
    });
  }

  filtrarProdutos() {
    this.produtosFiltrados = this.listaProdutos.filter(p => 
      p.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
    );
  }

  salvarProduto() {
    if (this.carregando) return;
    this.carregando = true;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.TOKEN}`);
    
    const request = this.editando 
      ? this.http.put(`${this.API_URL}/${this.produtoId}`, this.produto, { headers })
      : this.http.post(this.API_URL, this.produto, { headers });

    request.subscribe({
      next: () => {
        alert(this.editando ? 'Manto Atualizado! 🔄' : 'Manto Cadastrado! ⚽');
        this.limparFormulario();
        this.carregarProdutos();
        this.carregando = false;
      },
      error: (err) => {
        console.error(err);
        alert("Erro ao salvar. Verifique se a imagem não é grande demais.");
        this.carregando = false;
      }
    });
  }

  deletarProduto(id: number) {
    if (confirm('Deseja excluir este manto?')) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.TOKEN}`);
      this.http.delete(`${this.API_URL}/${id}`, { headers }).subscribe(() => this.carregarProdutos());
    }
  }

  prepararEdicao(p: any) {
    this.editando = true;
    this.produtoId = p.id;
    this.produto = { ...p };
    this.previewImagem = p.imagem_url;
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }

  limparFormulario() {
    this.produto = { nome: '', descricao: '', preco: 0, imagem_url: '', disponivel: true };
    this.previewImagem = null;
    this.editando = false;
    this.produtoId = null;
  }

  trackByProdutoId(index: number, item: any) { return item.id || index; }
}