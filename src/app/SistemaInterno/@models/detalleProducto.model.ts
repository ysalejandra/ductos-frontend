import { Producto } from "./producto.model";

export interface DetalleProductoInterface {
    idDetalle: number,
    pedido: number,
    producto: Producto,
    cantidad: number
    idPedido: number,
    idProducto: number
}

export class DetalleProducto implements DetalleProductoInterface {
    constructor(public idDetalle : number, public pedido : number, public producto : Producto, public cantidad: number, public idPedido:number, public idProducto:number) {
        this.idDetalle = idDetalle;
        this.pedido = pedido;
        this.producto = producto;
        this.cantidad = cantidad;
        this.idPedido = idPedido;
        this.idProducto = idProducto;
    }
    
}