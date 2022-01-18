export interface PagoTableInterface {
    idPago: number;
    tipoPago: string;
    monto: number;

}

export class PagoTable implements PagoTableInterface {
    constructor(public idPago:number, public tipoPago:string, public monto:number) {
        this.idPago = idPago;
        this.tipoPago = tipoPago;
        this.monto = monto;
    }
}