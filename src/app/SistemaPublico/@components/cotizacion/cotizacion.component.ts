import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { ClienteService } from 'src/app/SistemaInterno/@services/cliente.service';
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
  //cotizacion : CotizacionInterface;
  ocultar: boolean = false;
  
  constructor(fb: FormBuilder, public dialogo: MatDialog, public enviarEmail: EnviarEmailService) { 
    this.cotizacionForm = fb.group({
      nombre: ["", Validators.required],
      apellidoPaterno: ["", Validators.required],
      apellidoMaterno: ["", Validators.required],
      email: ["", Validators.required],
      telefono: ["", Validators.required],
      mensaje: ["", Validators.required]
    });
  }

  ngOnInit(): void {
  }

  enviarDatos() {
    
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
