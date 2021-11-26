import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { ClienteService } from 'src/app/SistemaInterno/@services/cliente.service';
import { EnviarEmailService } from '../../@services/enviar-email.service';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  clienteForm : FormGroup;
  cliente : Cliente;
  
  constructor(fb: FormBuilder, public clienteService: ClienteService, public dialogo: MatDialog, public enviarEmail: EnviarEmailService) { 
    this.clienteForm = fb.group({
      nombre: ["", Validators.required],
      apellidoPaterno: ["", Validators.required],
      apellidoMaterno: ["", Validators.required],
      email: ["", Validators.required],
      telefono: ["", Validators.required]
    });
    this.cliente = new Cliente("", "", "", "", "");
  }

  ngOnInit(): void {
  }

  saveData() {
    this.cliente = Object.assign(this.cliente, this.clienteForm.value);
    this.clienteService.addCliente(this.cliente).subscribe( (res:any) => {
      console.log(res);
      this.enviarEmail.enviarCorreo(this.cliente).subscribe( (res:any) => {
        console.log(res);
        
      });
    });
    
  }

  mostrarDialogo(): void {
    if (this.clienteForm.invalid) {
      console.log("Invalid");
      alert("¡Los campos están vacios!");
      return;
    }else{
      this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres enviar la cotización?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.saveData();
          alert("Se ha enviado la cotización, con éxito.");
        } else {
          alert("No se ha enviado la cotización");
        }
      });
    }
  }

}
