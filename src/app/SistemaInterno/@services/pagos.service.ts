import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(private http: HttpClient) { }


  borrarPago(id: number) {
    return this.http.delete('http://localhost:8080/pagos/'+id);
  }
}
