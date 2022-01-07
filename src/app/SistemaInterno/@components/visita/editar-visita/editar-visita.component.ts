import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Visita } from 'src/app/SistemaInterno/@models/visita.model';
import { VisitaService } from 'src/app/SistemaInterno/@services/visita.service';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-editar-visita',
  templateUrl: './editar-visita.component.html',
  styleUrls: ['./editar-visita.component.css']
})
export class EditarVisitaComponent implements OnInit {

  visitaForm : FormGroup;
  visita: Visita | undefined;
  fechaDeVisita: Date;
  
  constructor(fb: FormBuilder, public visitaService: VisitaService, private router : Router, private route: ActivatedRoute, public dialogo: MatDialog) { 
    this.visitaForm = fb.group({
      idVisita: [0, Validators.required],
      fechaVisita: [0, Validators.required],
      estadoVisita: ["", Validators.required],
      observaciones: ["", Validators.required],
      direccion: ["", Validators.required]
    });

    this.route.params.pipe(switchMap((params : Params) => this.visitaService.getVisitaPorId(+params['idVisita']))).subscribe( (res : Visita) => {
      this.visita = res;
      console.log(this.visita);
      this.fechaDeVisita = this.visita.fechaVisita;
      console.log(this.fechaDeVisita);
      this.visitaForm?.patchValue(this.visita);
    }); 
  }

  ngOnInit(): void {
  }

  saveData() {
    if (this.visitaForm.invalid) {
      console.log("Invalid");
      return;
    }else{
      this.visita = Object.assign(this.visita, this.visitaForm.value);
      this.visitaService.editVisita(this.visitaForm.value).subscribe((res: any) => console.log(res));
      this.router.navigate(["/dashboard/visitas"]);
    }
    
  }

  confirmar() {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres editar la visita?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.saveData();
        } else {
          this.router.navigate(["/dashboard/visitas"]);
        }
      });
  }
}

