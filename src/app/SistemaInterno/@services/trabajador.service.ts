import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trabajador } from '../@models/trabajador.model';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  constructor(private http: HttpClient) { }

  getTrabajadores(): Observable<Trabajador[]> {
    return this.http.get('http://localhost:8080/trabajadores').pipe(map((res: any) => {
      console.log(res);
      return res.map((trabajador: Trabajador) => {
        return <Trabajador>{
          rut: trabajador.rut,
          nombre: trabajador.nombre,
          apellidoPaterno: trabajador.apellidoPaterno,
          apellidoMaterno: trabajador.apellidoMaterno,
          fechaDeNacimiento: trabajador.fechaDeNacimiento,
          email: trabajador.email,
          password: trabajador.password,
          telefono: trabajador.telefono,
          rol: trabajador.rol,
          urlFoto: trabajador.urlFoto
        }
      })
    }));
  }

  addTrabajadores(trabajador: Trabajador) {
    console.log(trabajador);
    return this.http.post('http://localhost:8080/trabajadores', trabajador);
  }

  borrarTrabajadores() {

  }

  getTrabajador(rut: String): Observable<Trabajador>  {
    return this.http.get('http://localhost:8080/trabajadores/'+ rut).pipe(map( (trabajador: any) => {
      return <Trabajador>{ 
          rut: trabajador.rut,
          nombre: trabajador.nombre,
          apellidoPaterno: trabajador.apellidoPaterno,
          apellidoMaterno: trabajador.apellidoMaterno,
          fechaDeNacimiento: trabajador.fechaDeNacimiento,
          email: trabajador.email,
          password: trabajador.password,
          telefono: trabajador.telefono,
          rol: trabajador.rol,
          urlFoto: trabajador.urlFoto 
      };
    })
    );
  }
}
