import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Pedido } from 'src/app/SistemaInterno/@models/pedido.model';
import { Producto } from 'src/app/SistemaInterno/@models/producto.model';
import { ProductoTable } from 'src/app/SistemaInterno/@models/productoTable.model';
import { PedidoService } from 'src/app/SistemaInterno/@services/pedido.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ver-pedido',
  templateUrl: './ver-pedido.component.html',
  styleUrls: ['./ver-pedido.component.css']
})
export class VerPedidoComponent implements OnInit {
  
  pedidoForm : FormGroup;
  pedido: Pedido | undefined;
  listaProductos: Producto[] = [];
  isDataAvailable : boolean = false;
  panelOpenState = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: any;
  tableProductos : ProductoTable[] = [];
  displayedColumns: string[] = ['producto', 'categoria', 'cantidad', 'valor'];
  
  constructor(private fb: FormBuilder, private router : Router, private route: ActivatedRoute, private pedidoService: PedidoService, private location: Location) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params : Params) => this.pedidoService.getPedidoPorId(+params['idPedido']))).subscribe( (res : Pedido) => {
      console.log(res);
      this.pedido = res;
      this.pedido.detalleProductos.forEach(e => {
        this.tableProductos.push(new ProductoTable(e.producto.nombre, e.producto.categoria, e.cantidad, e.producto.valor));
      });
      this.dataSource = new MatTableDataSource(this.tableProductos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isDataAvailable = true;
      this.pedidoForm = this.fb.group({
        fechaIngreso: [this.pedido.fechaIngreso],
        fechaEntrega: [this.pedido.fechaEntrega],
        anotaciones: [this.pedido.anotaciones],
        estadoPedido: [this.pedido.estadoPedido],
        detalleProductos: this.pedido.detalleProductos
      })
      
    }); 
  }

  volverAtras(){
    this.location.back();
      console.log( 'goBack()...' );

  }



}
