export interface ProductoInterface {
    idDetalle: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    valor: number;
    cantidad: number;

}

export class Producto implements ProductoInterface {
    constructor(public idDetalle: number, public nombre:string, public descripcion:string, public categoria:string, public valor:number, public cantidad:number) {
        this.idDetalle = idDetalle;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.valor = valor;
        this.cantidad = cantidad;
    }
}