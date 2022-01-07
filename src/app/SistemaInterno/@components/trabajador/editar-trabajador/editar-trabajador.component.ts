import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Trabajador } from 'src/app/SistemaInterno/@models/trabajador.model';
import { TrabajadorService } from 'src/app/SistemaInterno/@services/trabajador.service';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-editar-trabajador',
  templateUrl: './editar-trabajador.component.html',
  styleUrls: ['./editar-trabajador.component.css']
})
export class EditarTrabajadorComponent implements OnInit {

  trabajadorForm : FormGroup;
  trabajador: Trabajador | undefined;
  fechaDeNacimiento: Date;

  constructor(fb: FormBuilder, public trabajadorService: TrabajadorService, private router : Router, private route: ActivatedRoute, public dialogo: MatDialog) { 
    
    this.trabajadorForm = fb.group({
      rut: ["", Validators.required],
      nombre: ["", Validators.required],
      apellidoPaterno: ["", Validators.required],
      apellidoMaterno: ["", Validators.required],
      fechaDeNacimiento: [0, Validators.required],
      email: ["", Validators.required],
      telefono: ["", Validators.required],

    });

    this.route.params.pipe(switchMap((params : Params) => this.trabajadorService.getTrabajador(params['rut']))).subscribe( (res : Trabajador) => {
      this.trabajador = res;
      this.fechaDeNacimiento = this.trabajador.fechaNacimiento;
      this.trabajadorForm?.patchValue(this.trabajador);
    }); 
  }

  ngOnInit(): void {
  }

  guardar() {
    if (this.trabajadorForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.trabajador = Object.assign(this.trabajador, this.trabajadorForm.value);
    this.trabajadorService.editTrabajador(this.trabajadorForm.value).subscribe(res => console.log(res));
    this.router.navigate(["/dashboard/trabajadores"]);
  }

  confirmar() {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres editar al trabajador?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.guardar();
        } else {
          this.router.navigate(["/dashboard/trabajadores"]);
        }
      });
  }


}
