import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { ClienteService } from 'src/app/SistemaInterno/@services/cliente.service';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {
  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listCliente: Cliente[] | undefined;
  dataSourse: any;
  displayedColumns: string[] = ['idCliente', 'nombre', 'email', 'telefono', 'acciones'];

  clientesCargados:boolean= false;
  clientes: Cliente[] = [];
  p: number = 1;

  dataSource : any;

  constructor(public clienteService: ClienteService, private router: Router, public dialogo: MatDialog ) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.getClientes().subscribe( (res : Cliente[]) => {
      this.clientes = res;
      this.listCliente = res;
      console.log(this.clientes);
      this.clientesCargados = true;
      this.dataSource = new MatTableDataSource(this.listCliente);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  eliminarCliente(id: number){
    console.log(id);
    this.clienteService.borrarCliente(id).subscribe((res: any) => {
      this.ngOnInit();
    });

  }

  agregar(){
    this.router.navigate(["/dashboard/clientes/agregar"]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  confirmar(id: number) {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres eliminar al cliente?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.eliminarCliente(id);
          this.router.navigate(["/dashboard/clientes"]);
        } else {
          this.router.navigate(["/dashboard/clientes"]);
        }
      });
  }

}
