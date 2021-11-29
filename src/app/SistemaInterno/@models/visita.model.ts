export interface VisitaInterface {
    idVisita: number;
    fechaVisita: string;
    estadoVisita: string;
    observaciones: string;
    direccionVisita: string;
}

export class Visita implements VisitaInterface {
    constructor(public idVisita: number, public fechaVisita:string, public estadoVisita:string, public observaciones:string, public direccionVisita:string) {
        this.idVisita = idVisita;
        this.fechaVisita = fechaVisita;
        this.estadoVisita = estadoVisita;
        this.observaciones = observaciones;
        this.direccionVisita = direccionVisita;
    }
}