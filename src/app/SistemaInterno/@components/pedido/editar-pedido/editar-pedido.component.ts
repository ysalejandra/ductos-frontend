import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { Obra } from 'src/app/SistemaInterno/@models/obra.model';
import { Pedido } from 'src/app/SistemaInterno/@models/pedido.model';
import { Producto } from 'src/app/SistemaInterno/@models/producto.model';
import { ProductoTable } from 'src/app/SistemaInterno/@models/productoTable.model';
import { Trabajador } from 'src/app/SistemaInterno/@models/trabajador.model';
import { ClienteService } from 'src/app/SistemaInterno/@services/cliente.service';
import { ObraService } from 'src/app/SistemaInterno/@services/obra.service';
import { PedidoService } from 'src/app/SistemaInterno/@services/pedido.service';
import { ProductoService } from 'src/app/SistemaInterno/@services/producto.service';
import { TrabajadorService } from 'src/app/SistemaInterno/@services/trabajador.service';
import { VisitaService } from 'src/app/SistemaInterno/@services/visita.service';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css']
})
export class EditarPedidoComponent implements OnInit {

  pedidoForm : FormGroup;
  pedido: Pedido;
  ocultar: boolean = false;

  fechaEntrega : any;

  value: any;

  id = 0;
  listaProductos: Producto[] = [];
  listaClientes: Cliente[] = [];
  listaObras: Obra[] = [];
  listaTrabajadores: Trabajador[] = [];
  obra: any;

  isDataAvailable : boolean = false;
  panelOpenState = false;

  dataSource: any;
  tableProductos : ProductoTable[] = [];
  displayedColumns: string[] = ['producto', 'categoria', 'cantidad', 'valor'];



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, public pedidoService: PedidoService, public clienteService: ClienteService, 
    public productoService: ProductoService, private router: Router, private route: ActivatedRoute, public obraService : ObraService, public trabajadorService: TrabajadorService,
    public dialogo: MatDialog, public visitaService: VisitaService) {
    this.pedidoForm = this.fb.group({
      idPedido: [0, Validators.required],
      fechaIngreso: ["", Validators.required],
      fechaEntrega: ["", Validators.required],
      anotaciones: ["", Validators.required],
      estadoPedido: ["", Validators.required],
      cliente: [null, Validators.required],
      obra: [null],
      trabajador: [null],
      detalleProductos: this.fb.array([])
    })

    this.pedido = new Pedido(0,new Date(),new Date(),0,'', '', '', [], {} as Trabajador, {} as Cliente, {} as Obra);
   }

  ngOnInit(): void {

    this.productoService.getProductos().subscribe ( res => {
      this.listaProductos = res;
    })
    this.clienteService.getClientes().subscribe(res => {
      this.listaClientes = res;
    })
    this.trabajadorService.getTrabajadores().subscribe(res => {
      this.listaTrabajadores = res;
    })
    this.obraService.getObras().subscribe(res => {
      this.listaObras = res;
    })

    this.route.params.pipe(switchMap((params : Params) => this.pedidoService.getPedidoPorId(+params['idPedido']))).subscribe( (res : Pedido) => {
      console.log(res);
      this.pedido = res;
      this.pedido.detalleProductos.forEach(e => {
        this.tableProductos.push(new ProductoTable(e.producto.nombre, e.producto.categoria, e.cantidad, e.producto.valor));
      });
      this.obra = this.pedido.obra;
      this.dataSource = new MatTableDataSource(this.tableProductos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isDataAvailable = true;
      this.fechaEntrega = new FormControl(this.pedido.fechaEntrega);
      this.pedidoForm = this.fb.group({
        idPedido: [this.pedido.idPedido],
        fechaIngreso: [this.pedido.fechaIngreso],
        fechaEntrega: [this.pedido.fechaEntrega],
        anotaciones: [this.pedido.anotaciones],
        estadoPedido: [this.pedido.estadoPedido],
        detalleProductos: this.fb.array([])
      })
      
    }); 
  }

  get productos() {
    return this.pedidoForm.controls["detalleProductos"] as FormArray;
  }

  addProducto() {
    const productos = this.fb.group({
        idProducto: [ 0, Validators.required],
        cantidad: [0, Validators.required]
    });
  
    this.productos.push(productos);
  }

  deleteProducto(productoIndex: number) {
    this.productos.removeAt(productoIndex);
}

  
  agregarVisita(idPedido: number){

    console.log("El id del pedido es: "+idPedido);
    this.visitaService.enlazarPedidoVisita(idPedido);

  }

  confirmar(){
    this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `¿Estas seguro que quieres editar el pedido?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.editar();
      } else {
        
      }
    });
}

editar(){
  if (this.pedidoForm.invalid) {
    console.log("Invalid");
    return;
  }
  
  this.pedido = Object.assign(this.pedido, this.pedidoForm.value);
  console.log(this.pedido);
  this.pedidoService.editPedido(this.pedido).subscribe( (res:any) => {
  this.router.navigate(["/dashboard/pedidos"]);
    console.log(res);
  });



}



}
