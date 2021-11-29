import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Trabajador } from 'src/app/SistemaInterno/@models/trabajador.model';
import { TrabajadorService } from 'src/app/SistemaInterno/@services/trabajador.service';

@Component({
  selector: 'app-agregar-trabajador',
  templateUrl: './agregar-trabajador.component.html',
  styleUrls: ['./agregar-trabajador.component.css']
})
export class AgregarTrabajadorComponent implements OnInit {

  trabajadorForm : FormGroup;
  trabajador: Trabajador;
  
  constructor(private fb: FormBuilder, public trabajadorService: TrabajadorService, private router: Router) { 
    this.trabajadorForm = this.fb.group({
      rut: ["", Validators.required],
      nombre: ["", Validators.required],
      apellidoPaterno: ["", Validators.required],
      apellidoMaterno: ["", Validators.required],
      fechaDeNacimiento: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      telefono: ["", Validators.required],
    })
    this.trabajador = new Trabajador('','','','','','','','','TRABAJADOR','');
  }

  ngOnInit(): void {
  }

  guardar(){
    if (this.trabajadorForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.trabajador = Object.assign(this.trabajador, this.trabajadorForm.value);
    this.trabajadorService.addTrabajadores(this.trabajador).subscribe( (res:any) => {
      console.log(res);
      this.router.navigate(["/interno/trabajadores"]);
      
    });

  }

}

