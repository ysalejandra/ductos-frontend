import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from '../@models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  constructor(private http : HttpClient) { }

  addPedido(pedido: Pedido){
    console.log(pedido);
    pedido.codigoSeguimiento = this.generarCodigo();
    return this.http.post('http://localhost:8080/pedidos', pedido);
  }

  getPedidoPorId(id : number): Observable<Pedido> {
    return this.http.get('http://localhost:8080/pedidos/'+ id).pipe(map( (pedido: any) => {
      return <Pedido>{ 
        idPedido: pedido.idPedido,
        fechaIngreso: pedido.fechaIngreso,
        fechaEntrega: pedido.fechaEntrega,
        valorPedido: pedido.valorPedido,
        codigoSeguimiento: pedido.codigoSeguimiento,
        anotaciones: pedido.anotaciones,
        estadoPedido: pedido.estadoPedido,
        detalleProductos: pedido.detalleProductos
        };
    })
    );
  }

  getPedidoPorCodigo (codigoPedido: String){
    return this.http.get('http://localhost:8080/pedidos/buscar/'+ codigoPedido).pipe(map( (pedido: any) => {
      return <Pedido>{ 
        idPedido: pedido.idPedido,
        fechaIngreso: pedido.fechaIngreso,
        fechaEntrega: pedido.fechaEntrega,
        valorPedido: pedido.valorPedido,
        codigoSeguimiento: pedido.codigoSeguimiento,
        anotaciones: pedido.anotaciones,
        estadoPedido: pedido.estadoPedido,
        detalleProductos: pedido.detalleProductos
        };
    })
    );
  }

  getPedidos(): Observable<Pedido[]>{
    return this.http.get('http://localhost:8080/pedidos').pipe(map( (res : any) => {
      console.log(res);
      return res.map( (pedido : Pedido) => {
        return <Pedido>{ 
          idPedido: pedido.idPedido,
          fechaIngreso: pedido.fechaIngreso,
          fechaEntrega: pedido.fechaEntrega,
          valorPedido: pedido.valorPedido,
          codigoSeguimiento: pedido.codigoSeguimiento,
          anotaciones: pedido.anotaciones,
          estadoPedido: pedido.estadoPedido,
          detalleProductos: pedido.detalleProductos
      }
      })
  }));
    
  }




  rand_Code(chars: any, lon: any): String {
    let code = "";
    for (let x = 0; x < lon; x++) {
      let rand = Math.floor(Math.random() * chars.length);
      code += chars.substr(rand, 1);
    }
    return code;
  }

  generarCodigo(): string {
    return this.rand_Code('0123456789', 6) + '' + this.rand_Code('ABCDEFGHIJKMNOPQRSTUVWXYZ', 2);
  }
}

