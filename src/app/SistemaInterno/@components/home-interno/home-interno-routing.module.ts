import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarClienteComponent } from '../Cliente/agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from '../Cliente/editar-cliente/editar-cliente.component';
import { ListarClientesComponent } from '../Cliente/listar-clientes/listar-clientes.component';
import { LoginComponent } from '../login/login.component';
import { HomeInternoComponent } from './home-interno.component';

const routes: Routes = [
  {path: '', component: HomeInternoComponent, children: [
    {path: '', component:AgregarClienteComponent},
    {path: 'clientes', component:ListarClientesComponent},
    {path: 'clientes/editar', component:EditarClienteComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeInternoRoutingModule { }
