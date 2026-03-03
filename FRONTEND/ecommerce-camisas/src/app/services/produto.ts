import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'https://venda-de-camisetas.vercel.app/produtos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  private getHeaders(token?: string) {
    // MUDANÇA AQUI: Se não receber o token por parâmetro, pega do localStorage
    const tokenSeguro = token || localStorage.getItem('token');

    if (tokenSeguro) {
      return {
        headers: new HttpHeaders({
          Authorization: `Bearer ${tokenSeguro}`
        })
      };
    }
    return {};
  }

  create(produto: any, token?: string): Observable<any> {
    return this.http.post(this.apiUrl, produto, this.getHeaders(token));
  }

  atualizar(id: number, produto: any, token?: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, produto, this.getHeaders(token));
  }

  excluir(id: number, token?: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders(token));
  }
}