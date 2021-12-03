export interface ProductoInterface {
    idDetalle: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    valor: number;
    cantidad: number;
    vigente: boolean;

}

export class Producto implements ProductoInterface {
    constructor(public idDetalle: number, public nombre:string, public descripcion:string, public categoria:string, public valor:number, public cantidad:number, public vigente: boolean) {
        this.idDetalle = idDetalle;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.valor = valor;
        this.cantidad = cantidad;
        this.vigente = true;
    }
}