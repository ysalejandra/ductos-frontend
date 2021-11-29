export interface TrabajadorInterface {
    rut: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaDeNacimiento: string;
    email: string;
    password: string;
    telefono: string;
    rol: string;
    urlFoto: string;
}

export class Trabajador implements TrabajadorInterface {
    constructor(public rut: number, public nombre:string, public apellidoPaterno:string, public apellidoMaterno:string, public fechaDeNacimiento:string, public email:string, public password: string, public telefono:string, public rol: string, public urlFoto: string) {
        this.rut = rut;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.fechaDeNacimiento = fechaDeNacimiento;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.rol = rol;
        this.urlFoto = urlFoto;
    }
}