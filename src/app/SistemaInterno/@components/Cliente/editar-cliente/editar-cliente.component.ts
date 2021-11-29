import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { ClienteService } from 'src/app/SistemaInterno/@services/cliente.service';
import { switchMap } from 'rxjs/operators';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  clienteForm : FormGroup;
  cliente : Cliente | undefined;
  constructor(fb: FormBuilder, public clienteService: ClienteService, public dialogo: MatDialog, private router: Router, private route : ActivatedRoute) { 
    this.clienteForm = fb.group({
      idCliente: [0, Validators.required],
      nombre: ["", Validators.required],
      apellidoPaterno: ["", Validators.required],
      apellidoMaterno: ["", Validators.required],
      email: ["", Validators.required],
      telefono: ["", Validators.required]
    });

    this.route.params.pipe(switchMap((params : Params) => this.clienteService.getClientePorId(+params['idCliente']))).subscribe( (res : Cliente) => {
      this.cliente = res;
      this.clienteForm?.patchValue(this.cliente);
    }); 
    
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
    this.clienteService.editCliente(this.clienteForm.value).subscribe(res => console.log(res));
    console.log(this.clienteForm.value);

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
