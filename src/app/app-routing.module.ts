import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './SistemaInterno/@components/login/login.component';
import { HomeComponent } from './SistemaPublico/@components/home/home.component';


const routes: Routes = [ 
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled',anchorScrolling: 'enabled', scrollOffset: [0, 64] })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
