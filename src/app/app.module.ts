import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditClienteComponent } from './SistemaInterno/cliente/edit-cliente/edit-cliente.component';
import { AddClienteComponent } from './SistemaInterno/cliente/add-cliente/add-cliente.component';
import { ListarClienteComponent } from './SistemaInterno/cliente/listar-cliente/listar-cliente.component';
import { HomePublicoComponent } from './SistemaHome/home-publico/home-publico.component';
import { AddPedidoComponent } from './SistemaInterno/pedidos/add-pedido/add-pedido.component';
import { EditPedidoComponent } from './SistemaInterno/pedidos/edit-pedido/edit-pedido.component';
import { ListarPedidoComponent } from './SistemaInterno/pedidos/listar-pedido/listar-pedido.component';
import { CalendarioComponent } from './SistemaInterno/calendario/calendario.component';
import { AddProductoComponent } from './SistemaInterno/producto/add-producto/add-producto.component';
import { EditProductoComponent } from './SistemaInterno/producto/edit-producto/edit-producto.component';
import { ListarProductoComponent } from './SistemaInterno/producto/listar-producto/listar-producto.component';
import { AddInformeComponent } from './SistemaInterno/informe/add-informe/add-informe.component';
import { HomeInternoComponent } from './SistemaInterno/homeInterno/home-interno/home-interno.component';
import { ContactanosComponent } from './SistemaHome/contactanos/contactanos.component';
import { RouterModule } from '@angular/router';
import { QuienesSomosComponent } from './SistemaHome/quienes-somos/quienes-somos.component';
import { TrabajosComponent } from './SistemaHome/trabajos/trabajos.component';
import { EstadoPedidoComponent } from './SistemaHome/estado-pedido/estado-pedido.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    AddClienteComponent,
    EditClienteComponent,
    ListarClienteComponent,
    HomePublicoComponent,
    AddPedidoComponent,
    EditPedidoComponent,
    ListarPedidoComponent,
    CalendarioComponent,
    AddProductoComponent,
    EditProductoComponent,
    ListarProductoComponent,
    AddInformeComponent,
    HomeInternoComponent,
    ContactanosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CarouselModule,
    RouterModule.forRoot([
      {path: 'home', component: HomePublicoComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'quienes-somos', component: QuienesSomosComponent},
      {path: 'contactanos', component: ContactanosComponent},
      {path: 'trabajos', component: TrabajosComponent},
      {path: 'estado-pedido', component: EstadoPedidoComponent}

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
