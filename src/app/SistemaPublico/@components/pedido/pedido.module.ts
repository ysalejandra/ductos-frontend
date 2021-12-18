import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoComponent } from './pedido.component';
import { SharedPublicoModule } from '../shared/shared-publico/shared-publico.module';



@NgModule({
  declarations: [PedidoComponent],
  imports: [
    CommonModule,
    SharedPublicoModule
  ],
  exports: [PedidoComponent]
})
export class PedidoModule { }
