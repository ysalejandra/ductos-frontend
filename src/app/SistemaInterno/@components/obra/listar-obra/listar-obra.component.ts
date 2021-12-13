import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Obra } from 'src/app/SistemaInterno/@models/obra.model';
import { ObraService } from 'src/app/SistemaInterno/@services/obra.service';

@Component({
  selector: 'app-listar-obra',
  templateUrl: './listar-obra.component.html',
  styleUrls: ['./listar-obra.component.css']
})
export class ListarObraComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listObra: Obra[] | undefined;
  dataSourse: any;
  displayedColumns: string[] = ['idObra', 'nombre', 'direccion', 'ciudad','acciones'];

  obrasCargadas:boolean= false;
  obras: Obra[] = [];
  p: number = 1;

  dataSource: any;

  constructor(public obraService: ObraService, private router: Router ) { }

  ngOnInit(): void {
    this.getObras();
  }

  getObras() {
    this.obraService.getObras().subscribe( (res : Obra[]) => {
      this.obras = res;
      this.listObra = res;
      console.log(this.obras);
      this.obrasCargadas = true;
      this.dataSource = new MatTableDataSource(this.listObra);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  eliminarObra(id: number){
    console.log(id);
    this.obraService.borrarObra(id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  agregar(){
    this.router.navigate(["/dashboard/obras/agregar"]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
