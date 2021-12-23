import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService : LoginService, private router: Router) { }
  
  canActivate() {
    if (!this.loginService.loggedIn()) {
      this.router.navigate(['entrar']);
      return false;
    }
    return true;
  }
  
}
