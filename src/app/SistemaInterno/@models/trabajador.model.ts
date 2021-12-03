export interface TrabajadorInterface {
    rut: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaDeNacimiento: string;
    email: any;
    password: string;
    telefono: string;
    rol: string;
    urlFoto: string;
    vigente: boolean;
}

export class Trabajador implements TrabajadorInterface {
    constructor(public rut: string, public nombre:string, public apellidoPaterno:string, public apellidoMaterno:string, public fechaDeNacimiento:string, public email:any, public password: string, public telefono:string, public rol: string, public urlFoto: string, public vigente: boolean) {
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
        this.vigente = true;
    }
}