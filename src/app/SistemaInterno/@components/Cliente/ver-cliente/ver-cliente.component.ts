import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { Pedido } from 'src/app/SistemaInterno/@models/pedido.model';
import { ClienteService } from 'src/app/SistemaInterno/@services/cliente.service';
import { PedidoService } from 'src/app/SistemaInterno/@services/pedido.service';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.css']
})
export class VerClienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: any;

  displayedColumns: string[] = ['idPedido', 'codigoSeguimiento', 'estadoPedido', 'valorPedido'];
  
  constructor(public pedidoService: PedidoService, public clienteService: ClienteService) {
   }

  ngOnInit(): void {

    this.getPedidos();
  }

  getPedidos(){


    this.pedidoService.getPedidos().subscribe( (res : Pedido[]) => {
      //this.clienteService.getPedidos(1);
    })
    
  }

}
