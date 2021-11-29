import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Visita } from '../@models/visita.model';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  constructor(private http: HttpClient) { }

  getVisitas(){
    return this.http.get('http://localhost:8080/visitas').pipe(map( (res : any) => {
      console.log(res);
      return res.map( (visita: Visita) => {
        return <Visita>{ 
          idVisita: visita.idVisita,
          fechaVisita: visita.fechaVisita,
          estadoVisita: visita.estadoVisita,
          observaciones: visita.observaciones,
          direccionVisita: visita.direccionVisita
          }
      })
  }));
  }

  addVisita(visita: Visita){
    console.log(visita);
    return this.http.post('http://localhost:8080/visitas', visita);
  }

  borrarVisita(){

  }
}
