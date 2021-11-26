export interface ClienteInterface {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    telefono: string;

}

export class Cliente implements ClienteInterface {
    constructor(public nombre:string, public apellidoPaterno:string, public apellidoMaterno:string, public email:string, public telefono:string) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.email = email;
        this.telefono = telefono;
    }
}