import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { EmailBody } from '../@models/emailBody.model';

@Injectable({
  providedIn: 'root'
})
export class EnviarEmailService {

  emailBody: EmailBody | undefined;

  constructor(private http: HttpClient) { }

  enviarCorreo(cliente: Cliente) {
    console.log(cliente);
    
    this.emailBody = new EmailBody(cliente.email
                          ,"¡Hola! "+ cliente.nombre +" Muchas gracias por contactarte con nosotros <br> Nuestros trabajadores se comunicaran contigo a la brevedad."
                          ,"Ductos Ortiz - Cotización");

    return this.http.post('http://localhost:8080/send/email', this.emailBody);
  }
}
