import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../@models/cliente.model';


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
    return this.http.get('http://localhost:8080/clientes').pipe(map((res: any) => res.data));
  }
}
