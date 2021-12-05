import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


  getVisitaPorId(id : number): Observable<Visita> {
    return this.http.get('http://localhost:8080/visitas/'+ id).pipe(map( (visita: any) => {
      return <Visita>{ 
        idVisita: visita.idVisita,
          fechaVisita: visita.fechaVisita,
          estadoVisita: visita.estadoVisita,
          observaciones: visita.observaciones,
          direccionVisita: visita.direccionVisita
        };
    })
    );
  }

  addVisita(visita: Visita){
    console.log(visita);
    return this.http.post('http://localhost:8080/visitas', visita);
  }

  borrarVisita(id: number){
    return this.http.delete('http://localhost:8080/visitas/'+id);
  }

  editVisita(visita: Visita) {
    return this.http.put('http://localhost:8080/visitas/', visita);
  }
}
