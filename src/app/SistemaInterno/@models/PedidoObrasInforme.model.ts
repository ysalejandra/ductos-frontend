export interface PedidoObrasInformeInterface {
    idPedido: number,
    codigoSeguimiento: String,
    estadoPedido: String,
    fechaIngreso: Date,
    fechaEntrega: Date

}

export class PedidoObrasInforme implements PedidoObrasInformeInterface {
    constructor(public idPedido:number, public codigoSeguimiento:String, public estadoPedido:String, public fechaIngreso: Date, public fechaEntrega: Date) {
        this.idPedido = idPedido;
        this.codigoSeguimiento = codigoSeguimiento;
        this.estadoPedido = estadoPedido;
        this.fechaIngreso = fechaIngreso;
        this.fechaEntrega = fechaEntrega; 

    }
}