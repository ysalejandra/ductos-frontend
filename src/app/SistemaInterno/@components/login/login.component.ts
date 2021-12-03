import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Trabajador } from '../../@models/trabajador.model';
import { TrabajadorService } from '../../@services/trabajador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, public trabajadorService: TrabajadorService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar() {
    console.log(this.form);
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    this.trabajadorService.getTrabajador(usuario).subscribe((res: any) => {
      console.log(res);

      if (res.rut == usuario && res.password == password) {
        //Redireccionamos
        this.fakeloading();

      } else {
        //mostramos un mensaje de error
        this.error();
        this.form.reset;
      }
    })
  }

  error() {
    this._snackBar.open('Usuario o contraseña ingresados son inválidos', '', {
      duration: 5000, //milisegundos,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }


  fakeloading() {
    this.loading = true;
    setTimeout(() => {
      //Redireccionamos al home de sistema interno
      this.router.navigate(['dashboard'])
    }, 1500);
  }

}
