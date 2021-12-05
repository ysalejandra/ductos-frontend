import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Visita } from 'src/app/SistemaInterno/@models/visita.model';
import { VisitaService } from 'src/app/SistemaInterno/@services/visita.service';

@Component({
  selector: 'app-agregar-visita',
  templateUrl: './agregar-visita.component.html',
  styleUrls: ['./agregar-visita.component.css']
})
export class AgregarVisitaComponent implements OnInit {

  visitaForm : FormGroup;
  visita: Visita;
  
  constructor(private fb: FormBuilder, public visitaService: VisitaService, private router: Router) { 
    this.visitaForm = this.fb.group({
      fechaVisita: ["", Validators.required],
      estadoVisita: ["", Validators.required],
      observaciones: ["", Validators.required],
      direccionVisita: ["", Validators.required],
    })
    this.visita = new Visita(0,'','','','',true);
  }

  ngOnInit(): void {
  }

  guardar(){
    if (this.visitaForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.visita = Object.assign(this.visita, this.visitaForm.value);
    this.visitaService.addVisita(this.visita).subscribe( (res:any) => {
      console.log(res);
      this.router.navigate(["/dashboard/visitas"]);
      
    });

  }

}