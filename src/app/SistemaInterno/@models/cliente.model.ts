export interface ClienteInterface {
    idCliente: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    telefono: string;

}

export class Cliente implements ClienteInterface {
    constructor(public idCliente: number, public nombre:string, public apellidoPaterno:string, public apellidoMaterno:string, public email:string, public telefono:string) {
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.email = email;
        this.telefono = telefono;
    }
}