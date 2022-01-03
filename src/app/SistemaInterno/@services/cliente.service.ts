import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../@models/cliente.model';
import { ClienteMayorCompra } from '../@models/clienteMayorCompra.model';
import { ClienteMayorGanancia } from '../@models/clienteMayorGanancia.model';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  

  constructor(private http: HttpClient) { }

  addCliente(cliente: Cliente) {
    console.log(cliente);
    return this.http.post('http://localhost:8080/clientes', cliente);
  }
  
  getClientes() : Observable<Cliente[]> {
    return this.http.get('http://localhost:8080/clientes').pipe(map( (res : any) => {
      console.log(res);
      return res.map( (cliente : any) => {
        return <Cliente>
        { idCliente:cliente.idCliente, 
          nombre: cliente.nombre,
          apellidoPaterno : cliente.apellidoPaterno, 
          apellidoMaterno : cliente.apellidoMaterno, 
          email: cliente.email, 
          telefono: cliente.telefono,
          vigente: cliente.vigente}
      })
  }));
  }

  getClienteMayorCompra(): Observable<ClienteMayorCompra[]> {
    return this.http.get('http://localhost:8080/clientes/mayorCompra').pipe(map( (res : any) => {
      return res.map((clienteMayorCompra: ClienteMayorCompra) => {
        console.log(clienteMayorCompra);
        return <ClienteMayorCompra>{
          nombre: clienteMayorCompra.nombre,
          apellidoPaterno : clienteMayorCompra.apellidoPaterno, 
          apellidoMaterno : clienteMayorCompra.apellidoMaterno, 
          email: clienteMayorCompra.email, 
          telefono: clienteMayorCompra.telefono,
          cantidad: clienteMayorCompra.cantidad
        }
      })
    }));
  }

  getClienteMayorGanancia(): Observable<ClienteMayorGanancia[]> {
    return this.http.get('http://localhost:8080/clientes/mayorGanancia').pipe(map( (res : any) => {
      return res.map((clienteMayorGanancia: ClienteMayorGanancia) => {
        console.log(clienteMayorGanancia);
        return <ClienteMayorGanancia>{
          nombre: clienteMayorGanancia.nombre,
          apellidoPaterno : clienteMayorGanancia.apellidoPaterno, 
          apellidoMaterno : clienteMayorGanancia.apellidoMaterno, 
          email: clienteMayorGanancia.email, 
          telefono: clienteMayorGanancia.telefono,
          ganancia: clienteMayorGanancia.ganancia
        }
      })
    }));
  }

  getClientePorId(id : number): Observable<Cliente> {
    return this.http.get('http://localhost:8080/clientes/'+ id).pipe(map( (cliente: any) => {
      return <Cliente>{ idCliente:cliente.idCliente, nombre: cliente.nombre, apellidoPaterno : cliente.apellidoPaterno, apellidoMaterno : cliente.apellidoMaterno, email: cliente.email, telefono: cliente.telefono};
    })
    );
  }

  editCliente(cliente : Cliente) {
    return this.http.put('http://localhost:8080/clientes', cliente);
  }

  borrarCliente(id: number) {
    return this.http.delete('http://localhost:8080/clientes/'+id);
  }

  agregarPedidoCotizacion(cliente: Cliente){
    return this.http.post('http://localhost:8080/clientes/agregarCotizacion', cliente);
  }
}
