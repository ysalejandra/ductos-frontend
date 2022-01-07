import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Obra } from '../@models/obra.model';
import { ProductoObrasInforme } from '../@models/ProductoObrasInforme.model';

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
          ciudad: obra.ciudad,
          descripcion: obra.descripcion
          }
      })
  }));
  }

  getProductosPorObra(idObra: number): Observable<ProductoObrasInforme[]>{
    console.log("OBRA SERVICE")
    return this.http.get('http://localhost:8080/obras/productosObra/'+idObra).pipe(map( (res : any) => {
      return res.map( (productoObras: ProductoObrasInforme) => {
        console.log(productoObras);
        return <ProductoObrasInforme>{ 
          idPedido: productoObras.idPedido,
          codigoSeguimiento: productoObras.codigoSeguimiento,
          estadoPedido: productoObras.estadoPedido,
          fechaIngreso: productoObras.fechaIngreso,
          fechaEntrega: productoObras.fechaEntrega
          }
      })
  }));
  }


  getObraPorId(id : number): Observable<Obra> {
    return this.http.get('http://localhost:8080/obras/'+ id).pipe(map( (obra: any) => {
      return <Obra>{ 
        idObra: obra.idObra,
          nombre: obra.nombre,
          direccion: obra.direccion,
          ciudad: obra.ciudad,
          descripcion: obra.descripcion
        };
    })
    );
  }

  addObra(obra: Obra){
    console.log(obra);
    return this.http.post('http://localhost:8080/obras', obra);
  }

  borrarObra(id: number){
    return this.http.delete('http://localhost:8080/obras/'+id);
  }

  editObra(obra: Obra) {
    return this.http.put('http://localhost:8080/obras/', obra);
  }
}
