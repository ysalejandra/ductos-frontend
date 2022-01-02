import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Obra } from 'src/app/SistemaInterno/@models/obra.model';
import { ObraService } from 'src/app/SistemaInterno/@services/obra.service';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-editar-obra',
  templateUrl: './editar-obra.component.html',
  styleUrls: ['./editar-obra.component.css']
})
export class EditarObraComponent implements OnInit {

  obraForm : FormGroup;
  obra: Obra | undefined;
  
  constructor(fb: FormBuilder, public obraService: ObraService, private router : Router, private route: ActivatedRoute, public dialogo: MatDialog) { 
    this.obraForm = fb.group({
      idObra: [0, Validators.required],
      nombre: ["", Validators.required],
      direccion: ["", Validators.required],
      ciudad: ["", Validators.required],
    });

    this.route.params.pipe(switchMap((params : Params) => this.obraService.getObraPorId(+params['idObra']))).subscribe( (res : Obra) => {
      this.obra = res;
      this.obraForm?.patchValue(this.obra);
    }); 
  }

  ngOnInit(): void {
  }

  guardar() {
    if (this.obraForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.obra = Object.assign(this.obra, this.obraForm.value);
    this.obraService.editObra(this.obraForm.value).subscribe(res => console.log(res));
    this.router.navigate(["/dashboard/obras"]);
  }

  confirmar(): void {
    if (this.obraForm.invalid) {
      console.log("Invalid");
      return;
    }else{
      this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres editar la obra?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.guardar();
          this.router.navigate(["/dashboard/obras"]);
        } else {
          this.router.navigate(["/dashboard/obras"]);
        }
      });
    }
  }

}
