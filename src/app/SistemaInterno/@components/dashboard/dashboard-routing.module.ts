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
import { ListarVisitaComponent } from '../visita/listar-visita/listar-visita.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';


const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: '', component: InicioComponent},
    {path: 'productos', component: ListarProductoComponent},
    {path: 'clientes', component: ListarClientesComponent},
    {path: 'trabajadores', component: ListarTrabajadorComponent},
    {path: 'obras', component: ListarObraComponent},
    {path: 'visitas', component: ListarVisitaComponent},
    {path: 'productos/agregar', component: AgregarProductoComponent},
    {path: 'clientes/agregar', component: AgregarClienteComponent},
    {path: 'clientes/editar', component: EditarClienteComponent},
    {path: 'trabajadores/agregar', component: AgregarTrabajadorComponent},
    {path: 'obras/agregar', component: AgregarObraComponent},
    {path: 'visitas/agregar', component: AgregarVisitaComponent},
    {path: 'productos/editar/:idDetalle', component: EditarProductoComponent},
    {path: 'calendario', component:CalendarioComponent},
    {path: 'obras/editar', component: EditarObraComponent},
    {path: 'trabajadores/editar', component: EditarTrabajadorComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
