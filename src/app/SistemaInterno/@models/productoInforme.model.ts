export interface ProductoInformeInterface {
    nombre: String,
    precio: number,
    cantidad: number
}

export class ProductoInforme implements ProductoInformeInterface {
    constructor(public nombre:string, public precio:number, public cantidad:number) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;

    }
}