import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClientesComponent } from '../Cliente/listar-clientes/listar-clientes.component';
import { ListarObraComponent } from '../obra/listar-obra/listar-obra.component';
import { ListarProductoComponent } from '../producto/listar-producto/listar-producto.component';
import { ListarTrabajadorComponent } from '../trabajador/listar-trabajador/listar-trabajador.component';
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
    {path: 'visitas', component: ListarVisitaComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
