import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent implements OnInit {

  pedidoForm : FormGroup;
  pedido: Pedido;
  ocultar: boolean = false;

  value: any;

  id = 0;
  listaProductos: Producto[] = [];
  
  constructor(private fb: FormBuilder, public pedidoService: PedidoService, public productoService: ProductoService, private router: Router,
    public dialogo: MatDialog) { 
    this.pedidoForm = this.fb.group({
      fechaIngreso: ["", Validators.required],
      fechaEntrega: ["", Validators.required],
      anotaciones: ["", Validators.required],
      estadoPedido: ["", Validators.required],
      productos: this.fb.array([])
    })

    this.pedido = new Pedido(0,new Date(),new Date(),0,'', '', '', []);
  }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe ( res => {
      this.listaProductos = res;
    })
  }
  
  get productos() {
    return this.pedidoForm.controls["productos"] as FormArray;
  }

  addProducto() {
    const productos = this.fb.group({
        idProducto: [0, Validators.required],
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
    this.pedidoService.addPedido(this.pedido).subscribe( (res:any) => {
    this.router.navigate(["/dashboard/pedidos/agregar"]);
      console.log(res);
    });
  }

  confirmar(){
      this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estas seguro que quieres enviar la cotización?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.guardar();
          this.ocultar = true;

        } else {
          alert("No se ha enviado la cotización");
        }
      });
  }
}
