import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Trabajador } from '../@models/trabajador.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }


  login(rut: String) {
    usuario: String;
    password: String;
    return this.http.get('http://localhost:8080/trabajadores/' + { rut }).pipe(map((res: any) => {
      console.log(res);
      return res.map((trabajador: Trabajador) => {
        return <Trabajador>{

        }
      })
    }));
  }
}
