import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private menuService : MenuService, private router: Router) { }

  ngOnInit(): void {
    this.cargarMenu();
    if (localStorage.getItem('trabajador') !== null) {
      var trabajador = JSON.parse(localStorage.getItem('trabajador') || '');
      this.nombre = trabajador.nombre + ' ' + trabajador.apellidoPaterno + ' ' + trabajador.apellidoMaterno;
    }
    
  }

  cargarMenu() {
    this.menuService.getMenu().subscribe(data => {
      console.log(data);
      this.menu = data;
    })
  }

  salir(){
    this.router.navigate(["/entrar"]);
  }

}
