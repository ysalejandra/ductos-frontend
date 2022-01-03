import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Visita } from 'src/app/SistemaInterno/@models/visita.model';
import { VisitaService } from 'src/app/SistemaInterno/@services/visita.service';

@Component({
  selector: 'app-editar-visita',
  templateUrl: './editar-visita.component.html',
  styleUrls: ['./editar-visita.component.css']
})
export class EditarVisitaComponent implements OnInit {

  visitaForm : FormGroup;
  visita: Visita | undefined;
  
  constructor(fb: FormBuilder, public visitaService: VisitaService, private router : Router, private route: ActivatedRoute) { 
    this.visitaForm = fb.group({
      idVisita: [0, Validators.required],
      fechaVisita: ["", Validators.required],
      estadoVisita: ["", Validators.required],
      observaciones: ["", Validators.required],
      direccion: ["", Validators.required]
    });

    this.route.params.pipe(switchMap((params : Params) => this.visitaService.getVisitaPorId(+params['idVisita']))).subscribe( (res : Visita) => {
      this.visita = res;
      this.visitaForm?.patchValue(this.visita);
    }); 
  }

  ngOnInit(): void {
  }

  saveData() {
    if (this.visitaForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.visita = Object.assign(this.visita, this.visitaForm.value);
    this.visitaService.editVisita(this.visitaForm.value).subscribe((res: any) => console.log(res));
    this.router.navigate(["/dashboard/visitas"]);
  }
}

