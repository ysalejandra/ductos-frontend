import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Trabajador } from 'src/app/SistemaInterno/@models/trabajador.model';
import { TrabajadorService } from 'src/app/SistemaInterno/@services/trabajador.service';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-agregar-trabajador',
  templateUrl: './agregar-trabajador.component.html',
  styleUrls: ['./agregar-trabajador.component.css']
})
export class AgregarTrabajadorComponent implements OnInit {

  trabajadorForm: FormGroup;
  trabajador: Trabajador;
  ocultar: boolean = false;
  hide = true;

  constructor(private fb: FormBuilder, public trabajadorService: TrabajadorService, private router: Router,
    public dialogo: MatDialog) {
    this.trabajadorForm = this.fb.group({
      rut: ["", Validators.required],
      nombre: ["", Validators.required],
      apellidoPaterno: ["", Validators.required],
      apellidoMaterno: ["", Validators.required],
      fechaNacimiento: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      telefono: ["", Validators.required],
    })
    this.trabajador = new Trabajador('', '', '', '', '', '', '', '', 'TRABAJADOR', '',true);
  }

  ngOnInit(): void {
  }

  guardar() {
    if (this.trabajadorForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.trabajador = Object.assign(this.trabajador, this.trabajadorForm.value);
    this.trabajadorService.addTrabajadores(this.trabajador).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(["/dashboard/trabajadores"]);
    });
  }

  confirmar() {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres agregar al trabajador?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.guardar();
          this.ocultar = true;
          this.router.navigate(["/dashboard/trabajadores"]);
        } else {
          this.router.navigate(["/dashboard/trabajadores"]);
        }
      });
  }

  getErrorMessage() {
    if (this.trabajador.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.trabajador.email.hasError('email') ? 'Not a valid email' : '';
  }

}

