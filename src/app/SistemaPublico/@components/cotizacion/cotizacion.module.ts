import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

// Importar animaciones, los botones, el diálogo y el componente
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { CotizacionComponent } from './cotizacion.component';

@NgModule({
  declarations: [
    DialogoConfirmacionComponent,// <--- Aquí
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatDialogModule, // <--- Aquí
    BrowserAnimationsModule, // <--- Aquí
    MatButtonModule, // <--- Aquí
  ],
  bootstrap: [CotizacionComponent],
  entryComponents: [
    DialogoConfirmacionComponent// <--- Aquí
  ]
})
export class CotizacionModule { }
