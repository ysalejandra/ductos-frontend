import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Visita } from 'src/app/SistemaInterno/@models/visita.model';
import { VisitaService } from 'src/app/SistemaInterno/@services/visita.service';

@Component({
  selector: 'app-listar-visita',
  templateUrl: './listar-visita.component.html',
  styleUrls: ['./listar-visita.component.css']
})
export class ListarVisitaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listvisita: Visita[] | undefined;
  dataSourse: any;
  displayedColumns: string[] = ['fechaVisita', 'estadoVisita','direccionVisita','acciones'];

  visitasCargadas:boolean= false;
  visitas: Visita[] = [];
  p: number = 1;

  dataSource : any;

  constructor(public visitaService: VisitaService, private router: Router ) { }

  ngOnInit(): void {
    this.getVisitas();
  }

  getVisitas() {
    this.visitaService.getVisitas().subscribe( (res : Visita[]) => {
      this.visitas = res;
      this.listvisita = res;
      console.log(this.visitas);
      this.visitasCargadas = true;
      this.dataSourse = this.listvisita;
      this.dataSource = new MatTableDataSource(this.listvisita);

    })
  }

  eliminarVisita(id: number){
    console.log(id);
    this.visitaService.borrarVisita(id).subscribe((res: any) => {
      this.ngOnInit();
    });

  }

  agregar(){
    this.router.navigate(["/interno/visitas/agregar"]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
