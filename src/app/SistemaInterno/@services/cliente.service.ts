import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
