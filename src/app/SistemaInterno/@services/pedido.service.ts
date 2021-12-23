import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
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
  
  getPedidoPorCodigo(codigoPedido: string) {
    return this.http.get('http://localhost:8080/pedidos')
  }

  getPedidos(){
    return this.http.get('http://localhost:8080/pedidos').pipe(map( (res : any) => {
      console.log(res);
      return res.map( (pedido : Pedido) => {
        return <Pedido>{ 
          idPedido: pedido.idPedido,
        fechaIngreso : pedido.fechaIngreso,
        fechaEntrega : pedido.fechaEntrega,
        valorPedido : pedido.valorPedido,
        codigoSeguimiento : pedido.codigoSeguimiento,
        anotaciones : pedido.anotaciones,
        estadoPedido : pedido.estadoPedido,
        detalleProductos : pedido.detalleProductos
          }
      })
  }));
  }
}
