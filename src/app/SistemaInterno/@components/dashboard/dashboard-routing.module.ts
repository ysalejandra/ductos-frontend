import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { CalendarioComponent } from '../calendario/calendario.component';
import { AgregarClienteComponent } from '../Cliente/agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from '../Cliente/editar-cliente/editar-cliente.component';
import { ListarClientesComponent } from '../Cliente/listar-clientes/listar-clientes.component';
import { VerClienteComponent } from '../Cliente/ver-cliente/ver-cliente.component';
import { InformeComponent } from '../informe/informe.component';
import { AgregarObraComponent } from '../obra/agregar-obra/agregar-obra.component';
import { EditarObraComponent } from '../obra/editar-obra/editar-obra.component';
import { ListarObraComponent } from '../obra/listar-obra/listar-obra.component';
import { AgregarPedidoComponent } from '../pedido/agregar-pedido/agregar-pedido.component';
import { ListarPedidoComponent } from '../pedido/listar-pedido/listar-pedido.component';
import { VerPedidoComponent } from '../pedido/ver-pedido/ver-pedido.component';
import { AgregarProductoComponent } from '../producto/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from '../producto/editar-producto/editar-producto.component';
import { ListarProductoComponent } from '../producto/listar-producto/listar-producto.component';
import { AgregarTrabajadorComponent } from '../trabajador/agregar-trabajador/agregar-trabajador.component';
import { EditarTrabajadorComponent } from '../trabajador/editar-trabajador/editar-trabajador.component';
import { ListarTrabajadorComponent } from '../trabajador/listar-trabajador/listar-trabajador.component';
import { AgregarVisitaComponent } from '../visita/agregar-visita/agregar-visita.component';
import { EditarVisitaComponent } from '../visita/editar-visita/editar-visita.component';
import { ListarVisitaComponent } from '../visita/listar-visita/listar-visita.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: InicioComponent, canActivate: [AuthGuard] },
      { path: 'productos', component: ListarProductoComponent, canActivate: [AuthGuard] },
      { path: 'productos/agregar', component: AgregarProductoComponent , canActivate: [AuthGuard] },
      { path: 'productos/editar/:idDetalle', component: EditarProductoComponent , canActivate: [AuthGuard]},
      { path: 'clientes', component: ListarClientesComponent, canActivate: [AuthGuard] },
      { path: 'clientes/agregar', component: AgregarClienteComponent, canActivate: [AuthGuard] },
      { path: 'clientes/editar/:idCliente', component: EditarClienteComponent, canActivate: [AuthGuard] },
      { path: 'clientes/ver/:idCliente', component: VerClienteComponent, canActivate: [AuthGuard] },
      { path: 'trabajadores', component: ListarTrabajadorComponent , canActivate: [AuthGuard]},
      { path: 'trabajadores/agregar', component: AgregarTrabajadorComponent , canActivate: [AuthGuard]},
      { path: 'trabajadores/editar/:rut', component: EditarTrabajadorComponent , canActivate: [AuthGuard]},
      { path: 'obras', component: ListarObraComponent , canActivate: [AuthGuard]},
      { path: 'obras/agregar', component: AgregarObraComponent, canActivate: [AuthGuard] },
      { path: 'obras/editar/:idObra', component: EditarObraComponent, canActivate: [AuthGuard] },
      { path: 'visitas', component: ListarVisitaComponent, canActivate: [AuthGuard] },
      { path: 'visitas/agregar', component: AgregarVisitaComponent, canActivate: [AuthGuard]},
      { path: 'visitas/editar/:idVisita', component: EditarVisitaComponent, canActivate: [AuthGuard]},
      { path: 'calendario', component: CalendarioComponent , canActivate: [AuthGuard]},
      { path: 'pedidos', component: ListarPedidoComponent, canActivate: [AuthGuard]},
      { path: 'pedidos/agregar', component: AgregarPedidoComponent, canActivate: [AuthGuard]},
      { path: 'pedidos/ver/:idPedido', component: VerPedidoComponent, canActivate: [AuthGuard]},
      { path: 'informe', component: InformeComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
