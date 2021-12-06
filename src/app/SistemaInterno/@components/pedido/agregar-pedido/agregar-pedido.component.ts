import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/SistemaInterno/@models/pedido.model';
import { Producto } from 'src/app/SistemaInterno/@models/producto.model';
import { PedidoService } from 'src/app/SistemaInterno/@services/pedido.service';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent implements OnInit {

  pedidoForm : FormGroup;
  pedido: Pedido;
  productos: Producto[];
  ocultar: boolean = false;
  
  constructor(private fb: FormBuilder, public pedidoService: PedidoService, private router: Router,
    public dialogo: MatDialog) { 
    this.pedidoForm = this.fb.group({
      fechaIngreso: ["", Validators.required],
      fechaEntrega: ["", Validators.required],
      anotaciones: ["", Validators.required],
      estadoPedido: ["", Validators.required],
    })
    this.productos = [];
    this.pedido = new Pedido(0,new Date(),new Date(),0,'', '', '', this.productos);
  }

  ngOnInit(): void {
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
