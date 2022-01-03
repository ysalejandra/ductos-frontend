export interface ClienteMayorGananciaInterface {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    telefono: string;
    ganancia: number;
}

export class ClienteMayorGanancia implements ClienteMayorGananciaInterface {
    constructor(public nombre:string, public apellidoPaterno:string, public apellidoMaterno:string, public email:string, public telefono:string, public ganancia: number) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.email = email;
        this.telefono = telefono;
        this.ganancia = ganancia;
    }
}