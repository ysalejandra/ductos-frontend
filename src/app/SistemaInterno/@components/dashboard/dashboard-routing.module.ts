import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from '../calendario/calendario.component';
import { AgregarClienteComponent } from '../Cliente/agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from '../Cliente/editar-cliente/editar-cliente.component';
import { ListarClientesComponent } from '../Cliente/listar-clientes/listar-clientes.component';
import { AgregarObraComponent } from '../obra/agregar-obra/agregar-obra.component';
import { EditarObraComponent } from '../obra/editar-obra/editar-obra.component';
import { ListarObraComponent } from '../obra/listar-obra/listar-obra.component';
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
      { path: '', component: InicioComponent },
      { path: 'productos', component: ListarProductoComponent },
      { path: 'productos/agregar', component: AgregarProductoComponent },
      { path: 'productos/editar/:idDetalle', component: EditarProductoComponent },
      { path: 'clientes', component: ListarClientesComponent },
      { path: 'clientes/agregar', component: AgregarClienteComponent },
      { path: 'clientes/editar/:idCliente', component: EditarClienteComponent },
      { path: 'trabajadores', component: ListarTrabajadorComponent },
      { path: 'trabajadores/agregar', component: AgregarTrabajadorComponent },
      { path: 'trabajadores/editar/:rut', component: EditarTrabajadorComponent },
      { path: 'obras', component: ListarObraComponent },
      { path: 'obras/agregar', component: AgregarObraComponent },
      { path: 'obras/editar/:idObra', component: EditarObraComponent },
      { path: 'visitas', component: ListarVisitaComponent },
      { path: 'visitas/agregar', component: AgregarVisitaComponent},
      { path: 'visitas/editar/:idVisita', component: EditarVisitaComponent},
      { path: 'calendario', component: CalendarioComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
