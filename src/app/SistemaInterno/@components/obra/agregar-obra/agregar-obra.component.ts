import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Obra } from 'src/app/SistemaInterno/@models/obra.model';
import { ObraService } from 'src/app/SistemaInterno/@services/obra.service';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-agregar-obra',
  templateUrl: './agregar-obra.component.html',
  styleUrls: ['./agregar-obra.component.css']
})
export class AgregarObraComponent implements OnInit {

  obraForm : FormGroup;
  obra: Obra;
  
  constructor(private fb: FormBuilder, public obraService: ObraService, private router: Router, public dialogo: MatDialog) { 
    this.obraForm = this.fb.group({
      nombre: ["", Validators.required],
      direccion: ["", Validators.required],
      ciudad: ["", Validators.required],
    })
    this.obra = new Obra(0,'','','',true);
  }

  ngOnInit(): void {
  }

  guardar(){
    if (this.obraForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.obra = Object.assign(this.obra, this.obraForm.value);
    this.obraService.addObra(this.obra).subscribe( (res:any) => {
    this.router.navigate(["/dashboard/obras"]);
      console.log(res);
    });

  }

  confirmar(): void {
    if (this.obraForm.invalid) {
      console.log("Invalid");
      return;
    }else{
      this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres agregar la obra?`
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

