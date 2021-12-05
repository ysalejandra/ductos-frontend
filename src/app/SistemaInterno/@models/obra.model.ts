export interface ObraInterface {
    idObra: number;
    nombre: string;
    direccion: string;
    ciudad: string;
    vigente: boolean;
}

export class Obra implements ObraInterface {
    constructor(public idObra: number, public nombre:string, public direccion:string, public ciudad:string, public vigente: boolean) {
        this.idObra = idObra;
        this.nombre = nombre;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.vigente = true;
    }
}