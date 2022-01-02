import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CambiarPasswordService } from 'src/app/auth/cambiar-password.service';
import { CambiarPasswordDTO } from 'src/app/models/cambiarPasswordDTO.model';

@Component({
  selector: 'app-ingresar-password',
  templateUrl: './ingresar-password.component.html',
  styleUrls: ['./ingresar-password.component.css']
})
export class IngresarPasswordComponent {

  password: string;
  confirmarPassword: string;
  tokenPassword: string;
  cambiarPasswordDTO : CambiarPasswordDTO;

  form: FormGroup;
  
  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, public cambiarPasswordService: CambiarPasswordService, private activatedRoute: ActivatedRoute,  private router: Router) {
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmarPassword: ['', Validators.required],
    })
   }

   actualizarPassword(){

    this.tokenPassword = this.activatedRoute.snapshot.params.tokenPassword;
    console.log(this.tokenPassword);
    
    this.cambiarPasswordDTO  = new CambiarPasswordDTO(this.form.controls['password'].value, this.form.controls['confirmarPassword'].value, this.tokenPassword);

    this.cambiarPasswordService.cambiarPassword(this.cambiarPasswordDTO).subscribe ((res:any) =>{
      console.log("Se cambio la contraseña correctamente");
      this.router.navigate(['/entrar'])
    }, (err : HttpErrorResponse) => {
      this.error();
      console.log(err);
      this.form.reset;
    });
   }


   error() {
    this._snackBar.open('Intentalo nuevamente', '', {
      duration: 5000, //milisegundos,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
