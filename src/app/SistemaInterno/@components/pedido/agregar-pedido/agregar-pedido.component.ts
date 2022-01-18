import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/SistemaInterno/@models/pedido.model';
import { Producto } from 'src/app/SistemaInterno/@models/producto.model';
import { PedidoService } from 'src/app/SistemaInterno/@services/pedido.service';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { ProductoService } from 'src/app/SistemaInterno/@services/producto.service';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { ClienteService } from 'src/app/SistemaInterno/@services/cliente.service';
import { Obra } from 'src/app/SistemaInterno/@models/obra.model';
import { Trabajador } from 'src/app/SistemaInterno/@models/trabajador.model';
import { ObraService } from 'src/app/SistemaInterno/@services/obra.service';
import { TrabajadorService } from 'src/app/SistemaInterno/@services/trabajador.service';
import { EnviarEmailService } from 'src/app/SistemaPublico/@services/enviar-email.service';
import { Pago } from 'src/app/SistemaInterno/@models/pago.model';
import { Visita } from 'src/app/SistemaInterno/@models/visita.model';

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent implements OnInit{

  pedidoForm : FormGroup;
  pedido: Pedido;
  ocultar: boolean = false;

  pago : Pago;

  pa : FormGroup;

  pag: string = "pagos";
  
  pro: string = "producto"

  value: any;
  mostrarPago: boolean = false;
  
  id = 0;
  listaProductos: Producto[] = [];
  listaClientes: Cliente[] = [];
  listaObras: Obra[] = [];
  listaTrabajadores: Trabajador[] = [];
  
  totalActualizado: number = 0;

  constructor(private fb: FormBuilder, public pedidoService: PedidoService, public clienteService: ClienteService, 
    public productoService: ProductoService, private router: Router, public obraService : ObraService, public trabajadorService: TrabajadorService, public enviarEmailService: EnviarEmailService,    public dialogo: MatDialog) { 
    this.pedidoForm = this.fb.group({
      fechaIngreso: ["", Validators.required],
      fechaEntrega: ["", Validators.required],
      anotaciones: ["", Validators.required],
      estadoPedido: ["", Validators.required],
      cliente: [null, Validators.required],
      obra: [null],
      trabajador: [null],
      detalleProductos: this.fb.array([]),
      pagos: this.fb.array([]),
      visitas: [null]
    })

    this.pa = this.fb.group({
      idProducto: [ 0, Validators.required],
      cantidad: [0, Validators.required]
    });
    

    this.pedido = new Pedido(0,new Date(),new Date(),0,'', '', '', [], {} as Trabajador, {} as Cliente, {} as Obra, null, []);
  }

  actualizar(){
    console.log("ACTUALIZAR");
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
  }
  

  actualizarValorTotal(){

    for(var i=0; i<this.productos.length; i++){

      var idProducto = this.pedidoForm.controls["detalleProductos"].value[i].idProducto;
      
      console.log("idProducto :"+idProducto);
      var cantidad = this.pedidoForm.controls["detalleProductos"].value[i].cantidad;
        console.log("Cantidad: "+cantidad);


      this.productoService.getProductoPorId(idProducto).subscribe( (res: Producto) => {
        

          var precio = res.valor;
          console.log("precio: "+precio);
          console.log("Cantidad: "+cantidad);

          var total = (precio * cantidad);
          console.log("total: "+total);
          this.totalActualizado += total;
          console.log("Total actualizado: "+this.totalActualizado);
          total = 0;
      })
      
    }

    console.log("Actualizar el valor total ");

  }

  
  addPago(){
    this.mostrarPago=true;
    const pagos = this.fb.group({
      tipoPago: ["", Validators.required],
      monto:  [ 0, Validators.required],
    });

    this.pagos.push(pagos);
  }

  get pagos() {
    return this.pedidoForm.controls["pagos"] as FormArray;
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

  guardar(){
    if (this.pedidoForm.invalid) {
      console.log("Invalid");
      return;
    }
    
    this.pedido = Object.assign(this.pedido, this.pedidoForm.value);
    console.log(this.pedido);
    this.pedidoService.addPedido(this.pedido).subscribe( (res: Pedido) => {
      this.pedido = res;
      console.log(this.pedido);
      console.log("Codigo de seguimientooooo:" + this.pedido.codigoSeguimiento);

      this.enviarEmailService.enviarCorreoAlCliente(this.pedido).subscribe( (res:any) => {
        console.log(res);
      });



      this.router.navigate(["/dashboard/pedidos"]);
    });
  }

  confirmar(){
      this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres guardar el pedido?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.guardar();
          this.ocultar = true;

        } else {
          alert("No se ha guardado el pedido");
        }
      });
  }
}
