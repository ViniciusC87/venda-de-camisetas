import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private itens: any[] = [];
  private itensSubject = new BehaviorSubject<any[]>([]);

  itens$ = this.itensSubject.asObservable();

  adicionar(produto: any) {
    this.itens.push(produto);
    this.itensSubject.next(this.itens);
  }

  remover(index: number) {
    this.itens.splice(index, 1);
    this.itensSubject.next(this.itens);
  }
}