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
import { SidebarComponent } from './SistemaInterno/@components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HomeInternoComponent } from './SistemaInterno/@components/home-interno/home-interno.component';
import { HomeComponent } from './SistemaPublico/@components/home/home.component';
import { AgregarClienteComponent } from './SistemaInterno/@components/Cliente/agregar-cliente/agregar-cliente.component';
import { ClienteService } from './SistemaInterno/@services/cliente.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ListarClientesComponent } from './SistemaInterno/@components/Cliente/listar-clientes/listar-clientes.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CotizacionComponent } from './SistemaPublico/@components/cotizacion/cotizacion.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeInternoComponent,
    HomeComponent,
    AgregarClienteComponent,
    ListarClientesComponent,
    CotizacionComponent
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
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'sidebar', component : SidebarComponent},
      {path: 'interno', component: HomeInternoComponent},
      {path: 'clientes/agregar', component : AgregarClienteComponent},
      {path: 'clientes', component: ListarClientesComponent}
    ])
  ],
  providers: [ ClienteService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
