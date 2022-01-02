import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { Pedido } from 'src/app/SistemaInterno/@models/pedido.model';
import { ClienteService } from 'src/app/SistemaInterno/@services/cliente.service';
import { PedidoService } from 'src/app/SistemaInterno/@services/pedido.service';
import { CotizacionInterface } from '../../@models/datosCotizacion.model';
import { EnviarEmailService } from '../../@services/enviar-email.service';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  cotizacionForm : FormGroup;
  cliente: Cliente;
  pedido: Pedido;
  
  ocultar: boolean = false;
  
  constructor(fb: FormBuilder, public dialogo: MatDialog, public enviarEmail: EnviarEmailService, public clienteService: ClienteService, public pedidoService: PedidoService) { 
    this.cotizacionForm = fb.group({
      nombre: ["", Validators.required],
      apellidoPaterno: ["", Validators.required],
      apellidoMaterno: ["", Validators.required],
      email: ["", Validators.required],
      telefono: ["", Validators.required],
      mensaje: ["", Validators.required]
    });
    this.cliente = new Cliente(0, "", "", "", "", "", true);
  }

  ngOnInit(): void {
  }

  enviarDatos() {
    //Creamos al cliente y lo guardamos
    this.cliente.nombre = this.cotizacionForm.controls['nombre'].value;
    this.cliente.apellidoPaterno = this.cotizacionForm.controls['apellidoPaterno'].value;
    this.cliente.apellidoMaterno = this.cotizacionForm.controls['apellidoMaterno'].value;
    this.cliente.email = this.cotizacionForm.controls['email'].value;
    this.cliente.telefono = this.cotizacionForm.controls['telefono'].value;
    

    //Creamos el pedido con estado COTIZACION y lo asociamos a cliente
    this.clienteService.agregarPedidoCotizacion(this.cliente).subscribe ( (res: any ) =>{
      console.log(res);
      console.log("Se creo el pedido COTIZACION con exito");
    });
   
    this.enviarEmail.enviarCorreoAlCliente(this.cotizacionForm.value).subscribe( (res:any) => {
      console.log(res);
    });

    this.enviarEmail.enviarCorreoALaEmpresa(this.cotizacionForm.value).subscribe( (res:any) => {
      console.log(res);
    });
      
  }

  mostrarDialogo(): void {
    if (this.cotizacionForm.invalid) {
      console.log("Invalid");
      return;
    }else{
      this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres enviar la cotización?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.enviarDatos();
          this.ocultar = true;

        } else {
          alert("No se ha enviado la cotización");
        }
      });
    }
  }

}
