import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  // Ajuste a porta aqui se o seu Node estiver usando a 3333
  private apiUrl = 'http://localhost:3000/produtos'; 

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  // Método que envia o novo produto (com estoque) para o banco
  create(produto: any): Observable<any> {
    return this.http.post(this.apiUrl, produto);
  }
}