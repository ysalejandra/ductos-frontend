import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Trabajador } from 'src/app/SistemaInterno/@models/trabajador.model';
import { TrabajadorService } from 'src/app/SistemaInterno/@services/trabajador.service';

@Component({
  selector: 'app-listar-trabajador',
  templateUrl: './listar-trabajador.component.html',
  styleUrls: ['./listar-trabajador.component.css']
})
export class ListarTrabajadorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listTrabajador: Trabajador[] | undefined;
  dataSourse: any;
  displayedColumns: string[] = ['rut', 'nombre', 'fechaDeNacimiento', 'email','telefono', 'rol', 'acciones'];

  trabajadoresCargados:boolean= false;
  trabajadores: Trabajador[] = [];
  p: number = 1;

  dataSource: any;

  constructor(public trabajadorService: TrabajadorService, private router: Router ) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.trabajadorService.getTrabajadores().subscribe( (res : Trabajador[]) => {
      this.trabajadores = res;
      this.listTrabajador = res;
      console.log(this.trabajadores);
      this.trabajadoresCargados = true;
      this.dataSourse = this.listTrabajador;
      const dataSource = new MatTableDataSource(this.listTrabajador);

    })
  }

  eliminarTrabajador(id: number){
    /*console.log(id);
    this.trabajadorService.borrarTrabajadores(id).subscribe ( (res: any) => {
      console.log(res);
    });*/

  }

  agregar(){
    this.router.navigate(["/interno/trabajadores/agregar"]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
