export interface VisitaInterface {
    idVisita: number;
    fechaVisita: string;
    estadoVisita: string;
    observaciones: string;
    direccion: string;
    vigente: boolean;
}

export class Visita implements VisitaInterface {
    constructor(public idVisita: number, public fechaVisita:string, public estadoVisita:string, public observaciones:string, public direccion:string, public vigente: boolean) {
        this.idVisita = idVisita;
        this.fechaVisita = fechaVisita;
        this.estadoVisita = estadoVisita;
        this.observaciones = observaciones;
        this.direccion = direccion;
        this.vigente = true;
    }
}