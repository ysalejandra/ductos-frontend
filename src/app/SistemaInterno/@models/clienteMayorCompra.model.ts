export interface ClienteMayorCompraInterface {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    telefono: string;
    cantidad: number;
}

export class ClienteMayorCompra implements ClienteMayorCompraInterface {
    constructor(public nombre:string, public apellidoPaterno:string, public apellidoMaterno:string, public email:string, public telefono:string, public cantidad: number) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.email = email;
        this.telefono = telefono;
        this.cantidad = cantidad;
    }
}