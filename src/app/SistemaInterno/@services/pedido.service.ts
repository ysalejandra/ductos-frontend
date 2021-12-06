import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../@models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  constructor(private http : HttpClient) { }

  addPedido(pedido: Pedido){
    console.log(pedido);
    return this.http.post('http://localhost:8080/pedidos', pedido);
  }
}
