export interface CotizacionInterface {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    telefono: string;
    mensaje: string;
    codigoSeguimiento: string;
}
export class Cotizacion implements CotizacionInterface {
    constructor( public nombre:string, public apellidoPaterno:string, public apellidoMaterno:string, public email:string,public telefono: string, public mensaje:string, public codigoSeguimiento: string) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.email = email;
        this.telefono = telefono;
        this.mensaje = mensaje;
        this.codigoSeguimiento = codigoSeguimiento;

    }
}