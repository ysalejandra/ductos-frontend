import { DetalleProducto } from "./detalleProducto.model";
import { Producto } from "./producto.model";

export interface PedidoInterface {
    idPedido: number;
    fechaIngreso: Date;
    fechaEntrega: Date;
    valorPedido: number;
    codigoSeguimiento: string;
    anotaciones: string;
    estadoPedido: string;
    detalleProductos: DetalleProducto[];
}

export class Pedido implements PedidoInterface {
    constructor(public idPedido: number, public fechaIngreso: Date, public fechaEntrega: Date, public valorPedido: number,
        public codigoSeguimiento: string, public anotaciones: string, public estadoPedido: string, public detalleProductos: DetalleProducto[]) {
        this.idPedido = idPedido;
        this.fechaIngreso = fechaIngreso;
        this.fechaEntrega = fechaEntrega;
        this.valorPedido = valorPedido;
        this.codigoSeguimiento = codigoSeguimiento;
        this.anotaciones = anotaciones;
        this.estadoPedido = estadoPedido;
        this.detalleProductos = detalleProductos;
    }
    
}