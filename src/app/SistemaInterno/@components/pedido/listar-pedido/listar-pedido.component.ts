import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/SistemaInterno/@models/pedido.model';
import { PedidoService } from 'src/app/SistemaInterno/@services/pedido.service';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css']
})
export class ListarPedidoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listPedido: Pedido[] | undefined;
  dataSource: any;
  pedidos: Pedido[] = [];

  displayedColumns: string[] = ['idPedido', 'codigoSeguimiento', 'estadoPedido', 'fechaIngreso', 'fechaEntrega','acciones'];


  constructor(private router: Router, public pedidoService: PedidoService, public dialogo: MatDialog) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos() {
    this.pedidoService.getPedidos().subscribe( (res : Pedido[]) => {
      this.pedidos = res;
      console.log(this.pedidos);
      this.dataSource = new MatTableDataSource(this.pedidos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarPedido(id: number){
    console.log(id);
    this.pedidoService.borrarPedido(id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }


  confirmar(id: number) {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres eliminar el pedido?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.eliminarPedido(id);
          this.router.navigate(["/dashboard/pedido"]);
        } else {
          this.router.navigate(["/dashboard/pedido"]);
        }
      });
  }
}
