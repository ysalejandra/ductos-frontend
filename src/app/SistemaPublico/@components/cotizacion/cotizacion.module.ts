import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CotizacionComponent } from './cotizacion.component';



@NgModule({
  declarations: [CotizacionComponent],
  imports: [
    CommonModule
  ],
  exports: [CotizacionComponent]
})
export class CotizacionModule { }
