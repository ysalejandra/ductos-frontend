import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public logueado: boolean = false;

  constructor(private http: HttpClient, private router : Router) { }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  login(email: string, password: string) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    let userLogin = {username: email, password: password};
    return this.http.post('http://localhost:8080/trabajadores/login', userLogin).pipe(map((res: any) => {
      console.log(res);
      if (res) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('trabajador', JSON.stringify(res));
        localStorage.setItem('rol', res.rol);
        this.logueado = true;
        
      }
    
      return res;
      
    }));
  }

  loggedIn() {
    if (this.tokenExpired(localStorage.getItem('token'))) {
      this.logout();
    }
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    this.logueado = false;
    this.router.navigate(['']);
  }
}
