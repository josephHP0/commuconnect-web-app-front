import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentacionComponent } from './presentacion.component';

import { InicioComponent } from './pages/inicio/inicio.component';


import { LoginComponent } from '../../features/autenticacion/pages/login/login.component'

const routes: Routes = [

  //{ path: '', component: PresentacionComponent }

  { path: '', component: InicioComponent },



  //{ path: 'login', component: LoginComponent }

];







@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentacionRoutingModule { }
