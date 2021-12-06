export interface ObraInterface {
    idObra: number;
    nombreObra: string;
    direccion: string;
    ciudad: string;
    vigente: boolean;
}

export class Obra implements ObraInterface {
    constructor(public idObra: number, public nombreObra:string, public direccion:string, public ciudad:string, public vigente: boolean) {
        this.idObra = idObra;
        this.nombreObra = nombreObra;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.vigente = true;
    }
}