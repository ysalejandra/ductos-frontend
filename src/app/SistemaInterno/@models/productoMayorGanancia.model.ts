export interface ProductoMayorGananciaInterface {
    nombre: String,
    categoria: String,
    descripcion: String,
    valor: number

}

export class ProductoMayorGanancia implements ProductoMayorGananciaInterface {
    constructor(public nombre:String, public categoria:String, public descripcion: String, public valor: number) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.valor = valor;
    }
}