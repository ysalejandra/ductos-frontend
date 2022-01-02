import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { CotizacionInterface } from '../@models/datosCotizacion.model';
import { EmailBody } from '../@models/emailBody.model';

@Injectable({
  providedIn: 'root'
})
export class EnviarEmailService {

  emailBody: EmailBody | undefined;

  constructor(private http: HttpClient) { }

  enviarCorreoAlCliente(cotizacion: CotizacionInterface) {
    console.log(cotizacion);
    
    this.emailBody = new EmailBody(cotizacion.email
                          ,"¡Hola! "+ cotizacion.nombre +" Muchas gracias por contactarte con nosotros <br> Nuestros trabajadores se comunicaran contigo en no más de una semana."
                          ,"Ductos Ortiz - Cotización");

    return this.http.post('http://localhost:8080/email/send', this.emailBody);
  }


  enviarCorreoALaEmpresa(cotizacion: CotizacionInterface) {
   console.log(cotizacion);
    
    this.emailBody = new EmailBody("ductosortizspa@gmail.com"
                          ,"¡Acaba de llegar una nueva cotización! Los datos del cliente son: <br><br>"+ 
                          "<b>Nombre:</b> "+cotizacion.nombre+" "+cotizacion.apellidoPaterno+" "+cotizacion.apellidoMaterno + "<br>" +
                          "<b>Correo:</b> "+cotizacion.email+ "<br>" +
                          "<b>Teléfono:</b> "+cotizacion.telefono + "<br>"+
                          "<b>Mensaje:</b> "+cotizacion.mensaje, "¡¡NUEVA COTIZACIÓN!!"
                          );

    return this.http.post('http://localhost:8080/email/send', this.emailBody);
  }

  



}
