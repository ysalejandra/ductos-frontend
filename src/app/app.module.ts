import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarModule } from './SistemaPublico/@components/navbar/navbar.module';
import { HeaderModule } from './SistemaPublico/@components/header/header.module';
import { PedidoModule } from './SistemaPublico/@components/pedido/pedido.module';
import { PortafolioModule } from './SistemaPublico/@components/portafolio/portafolio.module';
import { QuienesSomosModule } from './SistemaPublico/@components/quienes-somos/quienes-somos.module';
import { ContactoModule } from './SistemaPublico/@components/contacto/contacto.module';
import { CotizacionModule } from './SistemaPublico/@components/cotizacion/cotizacion.module';
import { FooterModule } from './SistemaPublico/@components/footer/footer.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavbarModule,
    HeaderModule,
    PedidoModule,
    PortafolioModule,
    QuienesSomosModule,
    ContactoModule,
    CotizacionModule,
    FooterModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
