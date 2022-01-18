import { Pedido } from "./pedido.model";

export interface VisitaTableInterface {
    idVisita: number;
    fechaVisita: Date;
    estadoVisita: string;
    direccion: string;
}

export class VisitaTable implements VisitaTableInterface {
    constructor(public idVisita: number, public fechaVisita:Date, public estadoVisita:string, public direccion:string) {
        this.idVisita = idVisita;
        this.fechaVisita = fechaVisita;
        this.estadoVisita = estadoVisita;
        this.direccion = direccion;
    }
}