import { Pedido } from "./pedido.model";

export interface VisitaInterface {
    idVisita: number;
    fechaVisita: Date;
    estadoVisita: string;
    observaciones: string;
    direccion: string;
    pedido: Pedido;
    vigente: boolean;
}

export class Visita implements VisitaInterface {
    constructor(public idVisita: number, public fechaVisita:Date, public estadoVisita:string, public observaciones:string, public direccion:string, public vigente: boolean, public pedido: Pedido) {
        this.idVisita = idVisita;
        this.fechaVisita = fechaVisita;
        this.estadoVisita = estadoVisita;
        this.observaciones = observaciones;
        this.direccion = direccion;
        this.pedido = pedido;
        this.vigente = true;
    }
}