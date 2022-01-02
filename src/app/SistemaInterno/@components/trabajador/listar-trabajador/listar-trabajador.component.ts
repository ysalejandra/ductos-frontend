import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Trabajador } from 'src/app/SistemaInterno/@models/trabajador.model';
import { TrabajadorService } from 'src/app/SistemaInterno/@services/trabajador.service';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-listar-trabajador',
  templateUrl: './listar-trabajador.component.html',
  styleUrls: ['./listar-trabajador.component.css']
})
export class ListarTrabajadorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listTrabajador: Trabajador[] | undefined;
  dataSourse: any;
  displayedColumns: string[] = ['rut', 'nombre', 'fechaNacimiento', 'email','telefono', 'acciones'];

  trabajadoresCargados:boolean= false;
  trabajadores: Trabajador[] = [];
  p: number = 1;

  dataSource: any;

  constructor(public trabajadorService: TrabajadorService, private router: Router,public dialogo: MatDialog ) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.trabajadorService.getTrabajadores().subscribe( (res : Trabajador[]) => {
      this.trabajadores = res;
      this.listTrabajador = res;
      console.log(this.trabajadores);
      this.trabajadoresCargados = true;
      this.dataSource = new MatTableDataSource(this.listTrabajador);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  eliminarTrabajador(rut: string){
    console.log(rut);
    this.trabajadorService.borrarTrabajadores(rut).subscribe((res: any) => {
      this.ngOnInit();
    });

  }

  agregar(){
    this.router.navigate(["/interno/trabajadores/agregar"]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  confirmar(rut: string) {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres eliminar al trabajador?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.eliminarTrabajador(rut);
          this.router.navigate(["/dashboard/trabajadores"]);
        } else {
          this.router.navigate(["/dashboard/trabajadores"]);
        }
      });
  }

}
