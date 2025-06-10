import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { SeleccionarServicioComponent } from 'src/app/features/user/seleccionar-servicio/seleccionar-servicio.component';
import { HomepageComponent } from 'src/app/features/user/homepage/homepage.component';

const routes: Routes = [


  {
    path: '',
    component: AdminComponent,
    children :[

      {path: 'seleccionar-servicio',component:SeleccionarServicioComponent},
      {path: 'homepage/:id',component:HomepageComponent}
    ]


  }









];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule {










 }
