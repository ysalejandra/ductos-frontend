import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  nombre: string = "";
  menu: Menu[] = [];
  cargado : boolean = false;
  rol : string = "";

  constructor(private menuService : MenuService, private router: Router, public loginService: LoginService) { }

  ngOnInit(): void {
    this.cargarMenu();
    if (localStorage.getItem('trabajador') !== null) {
      this.rol = localStorage.getItem('rol');
      var trabajador = JSON.parse(localStorage.getItem('trabajador') || '');
      this.nombre = trabajador.nombre + ' ' + trabajador.apellidoPaterno + ' ' + trabajador.apellidoMaterno;
    }
    
  }

  cargarMenu() {
    if (localStorage.getItem('rol') === 'TRABAJADOR') {
      this.menuService.getMenu().subscribe(data => {
        console.log(data);
        this.menu = data;
      })
    } else {
      this.menuService.getMenuAdmin().subscribe(data => {
        console.log(data);
        this.menu = data;
      })
    }
   
  }

  salir(){
    localStorage.clear();
    this.loginService.logout();
    this.router.navigate(["/entrar"]);
  }

}
