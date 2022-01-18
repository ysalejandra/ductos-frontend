export interface PagoInterface {
    idPago: number;
    monto: number;
    tipoPago: string;
    vigente: boolean;
}

export class Pago implements PagoInterface {
    constructor(public idPago: number, public monto:number, public tipoPago:string, public vigente: boolean) {
        this.idPago = idPago;
        this.monto = monto;
        this.tipoPago = tipoPago;
        this.vigente = true;
    }
}