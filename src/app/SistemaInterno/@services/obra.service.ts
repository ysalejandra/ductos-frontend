import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Obra } from '../@models/obra.model';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  constructor(private http: HttpClient) { }

  getObras(){
    return this.http.get('http://localhost:8080/obras').pipe(map( (res : any) => {
      console.log(res);
      return res.map( (obra: Obra) => {
        return <Obra>{ 
          idObra: obra.idObra,
          nombre: obra.nombre,
          direccion: obra.direccion,
          ciudad: obra.ciudad
          }
      })
  }));
  }

  addObra(obra: Obra){
    console.log(obra);
    return this.http.post('http://localhost:8080/obras', obra);
  }

  deleteObra(id: number){

  }
}
