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
import { RouterModule } from '@angular/router';
import { HomeInternoComponent } from './SistemaInterno/@components/home-interno/home-interno.component';
import { HomeComponent } from './SistemaPublico/@components/home/home.component';
import { AgregarClienteComponent } from './SistemaInterno/@components/Cliente/agregar-cliente/agregar-cliente.component';
import { ClienteService } from './SistemaInterno/@services/cliente.service';
import { ListarClientesComponent } from './SistemaInterno/@components/Cliente/listar-clientes/listar-clientes.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CotizacionComponent } from './SistemaPublico/@components/cotizacion/cotizacion.component';
import { EditarClienteComponent } from './SistemaInterno/@components/Cliente/editar-cliente/editar-cliente.component';
import { LoginComponent } from './SistemaInterno/@components/login/login.component';
import { FormsModule } from '@angular/forms'
import { SharedModule } from './SistemaInterno/@components/shared/shared.module';
import { AgregarProductoComponent } from './SistemaInterno/@components/producto/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './SistemaInterno/@components/producto/editar-producto/editar-producto.component';
import { ListarProductoComponent } from './SistemaInterno/@components/producto/listar-producto/listar-producto.component';
import { AgregarObraComponent } from './SistemaInterno/@components/obra/agregar-obra/agregar-obra.component';
import { EditarObraComponent } from './SistemaInterno/@components/obra/editar-obra/editar-obra.component';
import { ListarObraComponent } from './SistemaInterno/@components/obra/listar-obra/listar-obra.component';
import { AgregarTrabajadorComponent } from './SistemaInterno/@components/trabajador/agregar-trabajador/agregar-trabajador.component';
import { ListarTrabajadorComponent } from './SistemaInterno/@components/trabajador/listar-trabajador/listar-trabajador.component';
import { EditarTrabajadorComponent } from './SistemaInterno/@components/trabajador/editar-trabajador/editar-trabajador.component';
import { AgregarVisitaComponent } from './SistemaInterno/@components/visita/agregar-visita/agregar-visita.component';
import { EditarVisitaComponent } from './SistemaInterno/@components/visita/editar-visita/editar-visita.component';
import { ListarVisitaComponent } from './SistemaInterno/@components/visita/listar-visita/listar-visita.component';
import { InicioComponent } from './SistemaInterno/@components/dashboard/inicio/inicio.component';
import { CalendarioComponent } from './SistemaInterno/@components/calendario/calendario.component';
import { DialogoConfirmacionComponent } from './SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { AgregarPedidoComponent } from './SistemaInterno/@components/pedido/agregar-pedido/agregar-pedido.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  declarations: [
    AppComponent,
    HomeInternoComponent,
    HomeComponent,
    AgregarClienteComponent,
    ListarClientesComponent,
    CotizacionComponent,
    EditarClienteComponent,
    LoginComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    ListarProductoComponent,
    AgregarObraComponent,
    EditarObraComponent,
    ListarObraComponent,
    AgregarTrabajadorComponent,
    ListarTrabajadorComponent,
    EditarTrabajadorComponent,
    AgregarVisitaComponent,
    EditarVisitaComponent,
    ListarVisitaComponent,
    InicioComponent,
    CalendarioComponent,
    AgregarPedidoComponent
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
    NgxPaginationModule,
    SharedModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'interno', component: HomeInternoComponent},
      {path: 'entrar', component: LoginComponent},
      {path: 'dashboard', loadChildren: () => import('./SistemaInterno/@components/dashboard/dashboard.module').then(x => x.DashboardModule)}
    ])
  ],
  providers: [ ClienteService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
