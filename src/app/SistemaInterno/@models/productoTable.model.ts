export interface ProductoTableInterface {
    producto : string,
    categoria: string,
    cantidad: number,
    valor: number
}

export class ProductoTable implements ProductoTableInterface {
    constructor(public producto:string, public categoria: string, public cantidad:number, public valor:number) {
        this.producto = producto;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.valor = valor;

    }
}