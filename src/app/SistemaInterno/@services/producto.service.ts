import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../@models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  

  constructor(private http: HttpClient) { }

  getProductos():Observable<Producto[]> {
    return this.http.get('http://localhost:8080/productos').pipe(map( (res : any) => {
      console.log(res);
      return res.map( (producto : Producto) => {
        return <Producto>{ idDetalle:producto.idDetalle, nombre: producto.nombre, descripcion : producto.descripcion, categoria : producto.categoria, valor: producto.valor, cantidad: producto.cantidad}
      })
  }));
  }

  addProducto(producto: Producto) {
    console.log(producto);
    return this.http.post('http://localhost:8080/productos', producto);
  }

  borrarProducto(id: number) {
    return this.http.delete('http://localhost:8080/productos/'+id);
  }

  getProductoPorId(id : number): Observable<Producto> {
    return this.http.get('http://localhost:8080/productos/'+ id).pipe(map( (producto: any) => {
      return <Producto>{ idDetalle:producto.idDetalle, nombre: producto.nombre, descripcion : producto.descripcion, categoria : producto.categoria, valor: producto.valor, cantidad: producto.cantidad};
    })
    );
  }

  editProducto(producto : Producto) {
    return this.http.put('http://localhost:8080/productos/', producto);
  }

}
