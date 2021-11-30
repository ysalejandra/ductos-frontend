import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbardashboard',
  templateUrl: './navbardashboard.component.html',
  styleUrls: ['./navbardashboard.component.css']
})
export class NavbardashboardComponent implements OnInit {

  menu: Menu[] = [];

  constructor(private menuService : MenuService) { }

  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu() {
    this.menuService.getMenu().subscribe(data => {
      console.log(data);
      this.menu = data;
    })
  }

}
