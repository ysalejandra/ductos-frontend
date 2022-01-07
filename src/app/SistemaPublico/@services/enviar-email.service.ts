import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { Pedido } from 'src/app/SistemaInterno/@models/pedido.model';
import { CotizacionInterface } from '../@models/cotizacion.model';
import { EmailBody } from '../@models/emailBody.model';

@Injectable({
  providedIn: 'root'
})
export class EnviarEmailService {

  emailBody: EmailBody | undefined;

  constructor(private http: HttpClient) { }

  enviarCorreoAlCliente(pedido: Pedido) {
    
    this.emailBody = new EmailBody(pedido.cliente.email
                          ,"¡HOLA! "+ pedido.cliente.nombre +" <br> Muchas gracias por venir a realizar tu pedido con nosotros"+
                          "<br>Para que estes al tanto del proceso de fabricación de tu pedido "+
                          "<br>El código de seguimiento es: "+pedido.codigoSeguimiento
                          ,"Ductos Ortiz - Pedido realizado");

    return this.http.post('http://localhost:8080/email/send', this.emailBody);
  }
  
  enviarCorreoAlClienteCotizacion(cotizacion: CotizacionInterface) {
    console.log(cotizacion);
    
    this.emailBody = new EmailBody(cotizacion.email
                          ,"¡Hola! "+ cotizacion.nombre +" Muchas gracias por contactarte con nosotros <br> Nuestros trabajadores se comunicaran contigo en no más de una semana."+
                          "<br><br><i>Consideración: Si la cotización finalmente se va a realizar, el código de seguimiento para estar al tanto del proceso es: "+cotizacion.codigoSeguimiento+"</i>"
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
                          "<b>Mensaje:</b> "+cotizacion.mensaje+"<br><br>"+
                          "El codigo de seguimiento generado para esta cotizacion es: "+cotizacion.codigoSeguimiento

                          , "¡¡NUEVA COTIZACIÓN!!"
                          );

    return this.http.post('http://localhost:8080/email/send', this.emailBody);
  }

  



}
