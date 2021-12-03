import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Trabajador } from 'src/app/SistemaInterno/@models/trabajador.model';
import { TrabajadorService } from 'src/app/SistemaInterno/@services/trabajador.service';

@Component({
  selector: 'app-editar-trabajador',
  templateUrl: './editar-trabajador.component.html',
  styleUrls: ['./editar-trabajador.component.css']
})
export class EditarTrabajadorComponent implements OnInit {

  trabajadorForm : FormGroup;
  trabajador: Trabajador | undefined;

  constructor(fb: FormBuilder, public trabajadorService: TrabajadorService, private router : Router, private route: ActivatedRoute) { 
    
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
      this.trabajadorForm?.patchValue(this.trabajador);
    }); 
  }

  ngOnInit(): void {
  }

  saveData() {
    if (this.trabajadorForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.trabajador = Object.assign(this.trabajador, this.trabajadorForm.value);
    this.trabajadorService.editTrabajador(this.trabajadorForm.value).subscribe(res => console.log(res));
    this.router.navigate(["/dashboard/trabajadores"]);
  }



}
