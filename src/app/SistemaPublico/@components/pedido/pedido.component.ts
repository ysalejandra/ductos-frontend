import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/SistemaInterno/@models/pedido.model';
import { PedidoService } from 'src/app/SistemaInterno/@services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  mostrar: boolean = false;
  mostrarMensaje: boolean = false;

  estadoPedido: boolean = true;
  pedido: Pedido | undefined;
  estadoDelPedido: any;

  colorRecibido: string ="";
  borderRecibido: any;
  opacoRecibido: boolean = false;

  colorEnFabricacion: string ="";
  borderEnFabricacion: any;
  opacoEnFabricacion: boolean =false;

  colorFinalizado: string ="";
  borderFinalizado: any;
  opacoFinalizado: boolean =false;

  fechaDeEntrega: any;
  fechaDeIngreso: any;
  valorPedido: any;

  constructor(public pedidoService: PedidoService) { }

  ngOnInit(): void {
  }

  mostrarInfo(codigoPedido: string){
    console.log("El codigo del pedido es: "+codigoPedido);
    this.obtenerEstadoPedido(codigoPedido);
    this.mostrar = true;
  }

  obtenerEstadoPedido(codigoPedido : string){
    this.pedidoService.getPedidoPorCodigo(codigoPedido).subscribe ((res:any) => {
      this.pedido = res;

      this.fechaDeIngreso = this.pedido?.fechaIngreso;
      this.fechaDeEntrega = this.pedido?.fechaEntrega;
      this.valorPedido = this.pedido?.valorPedido;

      console.log(res);
      if (res == null){
        this.mostrarMensaje = true;
      }else{
        console.log(res);
        this.estadoDelPedido = this.pedido?.estadoPedido;
  
        if (this.estadoDelPedido == 'RECIBIDO'){
            //this.colorRecibido="#28EB18";
            this.borderRecibido ="0.5rem solid rgb(64 239 21)"
            this.opacoEnFabricacion = true;
            this.opacoFinalizado = true;
        }else{
          if(this.estadoDelPedido == 'ENPROCESO'){
            console.log("EN PROCESO")
            //this.colorRecibido="A0F01D";
            this.borderRecibido ="0.5rem solid rgb(64 239 21)"
            //this.colorEnFabricacion="#A0F01D";
            this.borderEnFabricacion ="0.5rem solid rgb(64 239 21)"
            this.opacoFinalizado = true;
          }else{
            if(this.estadoDelPedido == 'FINALIZADO'){
              //this.colorRecibido="#FF0000";
              this.borderRecibido ="0.5rem solid rgb(64 239 21)"
              //this.colorEnFabricacion="#FF0000";
              this.borderEnFabricacion ="0.5rem solid rgb(64 239 21)"
              //this.colorFinalizado="#2518EB";
              this.borderFinalizado ="0.5rem solid rgb(64 239 21)"
            }
          }
  
        }
  
        console.log("EL ID ES: "+this.pedido?.estadoPedido);
      }
    });
  }

}
