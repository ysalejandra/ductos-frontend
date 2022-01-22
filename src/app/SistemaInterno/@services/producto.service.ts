import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../@models/producto.model';
import { ProductoInforme } from '../@models/productoInforme.model';
import { ProductoMayorGanancia } from '../@models/productoMayorGanancia.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get('http://localhost:8080/productos').pipe(map((res: any) => {
      console.log(res);
      return res.map((producto: Producto) => {
        return <Producto>{ idProducto: producto.idProducto, nombre: producto.nombre, descripcion: producto.descripcion, categoria: producto.categoria, valor: producto.valor, cantidad: producto.cantidad }
      })
    }));
  }

  getProductosMasCompradosInformes(fechaInicio: string, fechaFin: string): Observable<ProductoInforme[]> {

    return this.http.get('http://localhost:8080/productos/masComprados?fechaInicio='+fechaInicio+'&fechaFin='+fechaFin).pipe(map((res: any) => {
      return res.map((productoInforme: ProductoInforme) => {
        return <ProductoInforme>{
          nombre: productoInforme.nombre,
          cantidad: productoInforme.cantidad,
          precio: productoInforme.precio
        }
      }
      )
    }));
  }


  getProductosMayorGanancia(fechaInicio: string, fechaFin: string): Observable<ProductoMayorGanancia[]> {

    return this.http.get('http://localhost:8080/productos/mayorGanancia?fechaInicio='+fechaInicio+'&fechaFin='+fechaFin).pipe(map((res: any) => {
      return res.map((productoMayorGanancia: ProductoMayorGanancia) => {
        console.log(productoMayorGanancia);
        return <ProductoMayorGanancia>{
          nombre: productoMayorGanancia.nombre,
          categoria: productoMayorGanancia.categoria,
          descripcion: productoMayorGanancia.descripcion,
          valor: productoMayorGanancia.valor
        }
      })
    }));
  }

  addProducto(producto: Producto) {
    console.log(producto);
    return this.http.post('http://localhost:8080/productos', producto);
  }

  borrarProducto(id: number) {
    return this.http.delete('http://localhost:8080/productos/' + id);
  }

  getProductoPorId(id: number): Observable<Producto> {
    return this.http.get('http://localhost:8080/productos/' + id).pipe(map((producto: any) => {
      return <Producto>{ idProducto: producto.idProducto, nombre: producto.nombre, descripcion: producto.descripcion, categoria: producto.categoria, valor: producto.valor, cantidad: producto.cantidad };
    })
    );
  }

  editProducto(producto: Producto) {
    return this.http.put('http://localhost:8080/productos/', producto);
  }

}
