import { Cliente } from "./cliente.model";
import { DetalleProducto } from "./detalleProducto.model";
import { Obra } from "./obra.model";
import { Producto } from "./producto.model";
import { Trabajador } from "./trabajador.model";

export interface PedidoInterface {
    idPedido: number;
    fechaIngreso: Date;
    fechaEntrega: Date;
    valorPedido: number;
    codigoSeguimiento: string;
    anotaciones: string;
    estadoPedido: string;
    detalleProductos: DetalleProducto[];
    cliente: Cliente;
    trabajador: Trabajador;
    obra: Obra;
}

export class Pedido implements PedidoInterface {
    constructor(public idPedido: number, public fechaIngreso: Date, public fechaEntrega: Date, public valorPedido: number,
        public codigoSeguimiento: string, public anotaciones: string, public estadoPedido: string, public detalleProductos: DetalleProducto[], public trabajador: Trabajador, public cliente : Cliente, public obra : Obra) {
        this.idPedido = idPedido;
        this.fechaIngreso = fechaIngreso;
        this.fechaEntrega = fechaEntrega;
        this.valorPedido = valorPedido;
        this.codigoSeguimiento = codigoSeguimiento;
        this.anotaciones = anotaciones;
        this.estadoPedido = estadoPedido;
        this.detalleProductos = detalleProductos;
        this.trabajador = trabajador;
        this.obra = obra;
        this.cliente = cliente;
    }
    
}