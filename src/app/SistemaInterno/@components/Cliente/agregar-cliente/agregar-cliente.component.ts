import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { ClienteService } from 'src/app/SistemaInterno/@services/cliente.service';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';


@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {


  clienteForm : FormGroup;
  cliente : Cliente;
  constructor(fb: FormBuilder, public clienteService: ClienteService, public dialogo: MatDialog, private router: Router) { 
    this.clienteForm = fb.group({
      nombre: ["", Validators.required],
      apellidoPaterno: ["", Validators.required],
      apellidoMaterno: ["", Validators.required],
      email: ["", Validators.required],
      telefono: ["", Validators.required]
    });
    this.cliente = new Cliente(0, "", "", "", "", "", true);
  }

  ngOnInit(): void {
  }
  
  ocultarModal() {

  }

  saveData() {
    if (this.clienteForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.cliente = Object.assign(this.cliente, this.clienteForm.value);
    this.clienteService.addCliente(this.cliente).subscribe( (res:any) => {
      this.router.navigate(["/dashboard/clientes"]);
    });

  }

  confirmar(): void {
    if (this.clienteForm.invalid) {
      console.log("Invalid");
      return;
    }else{
      this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres agregar el cliente?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.saveData();
        } else {
          this.router.navigate(["/dashboard/clientes"]);
        }
      });
    }
  }
}
