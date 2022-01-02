import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CambiarPasswordService } from 'src/app/auth/cambiar-password.service';
import { CambiarPasswordDTO } from 'src/app/models/cambiarPasswordDTO.model';
import { EmailValuesDTO } from 'src/app/models/EmailValuesDTO.model';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  form: FormGroup;
  cambiarPasswordDTO: CambiarPasswordDTO;
  emailValuesDTO: EmailValuesDTO;
  loading: boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar, public cambiarPasswordService: CambiarPasswordService) {
    this.form = this.fb.group({
      mailTo: ['', Validators.required],
    })

    this.emailValuesDTO = new EmailValuesDTO("");
   }

  ngOnInit(): void {
  }

  error() {
    this._snackBar.open('No existe un trabajador con ese correo', '', {
      duration: 5000, //milisegundos,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  enviarCorreo(){
    this.emailValuesDTO = Object.assign(this.emailValuesDTO, this.form.value);

    this.cambiarPasswordService.olvidePassword(this.emailValuesDTO).subscribe((res:EmailValuesDTO) =>{
      console.log("Se envio el correo con el token para cambiar contraseña");
      this.aviso();
    }, (err : HttpErrorResponse) => {
      this.error();
      console.log(err.message);
      this.form.reset;
    }
    );
  }


  aviso() {
    this._snackBar.open('Se envio un mensaje a tu correo electrónico', '', {
      duration: 5000, //milisegundos,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
