import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      usuario: ['',Validators.required],
      password: ['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  ingresar(){
    console.log(this.form);
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    if ((usuario == 'alejandra' || usuario =='ignacio') && password == '123'){ //aca iria una peticion al servidor
      //Redireccionamos
      this.fakeloading();

    }else{
      //mostramos un mensaje de error
      this.error();
      this.form.reset;
    }
  }

  error(){
    this._snackBar.open('Usuario o contraseña ingresados son inválidos','', {
      duration: 5000, //milisegundos,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }


  fakeloading(){
    this.loading = true;
    setTimeout(() =>{
      //Redireccionamos al home de sistema interno
      this.router.navigate(['dashboard'])
    }, 1500);

  }

}
