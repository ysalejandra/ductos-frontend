import { Producto } from "./producto.model";

export interface PedidoInterface {
    idPedido: number;
    fechaIngreso: string;
    fechaEntrega: string;
    valorPedido: number;
    codigoSeguimiento: string;
    anotaciones: string;
    estadoPedido: string;
    productos: Producto[];
}

export class Pedido implements PedidoInterface {
    constructor(public idPedido: number, public fechaIngreso: string, public fechaEntrega: string, public valorPedido: number,
        public codigoSeguimiento: string, public anotaciones: string, public estadoPedido: string, public productos: Producto[]) {
        this.idPedido = idPedido;
        this.fechaIngreso = fechaIngreso;
        this.fechaEntrega = fechaEntrega;
        this.valorPedido = valorPedido;
        this.codigoSeguimiento = codigoSeguimiento;
        this.anotaciones = anotaciones;
        this.estadoPedido = estadoPedido;
        this.productos = productos;
    }
    
}