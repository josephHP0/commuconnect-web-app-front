import { UserLayoutModule } from './../../layout/user-layout/user-layout.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Para las comunidades
import { SeleccionComunidadComponent } from './seleccion-comunidad/seleccion-comunidad.component';
//Para ver mis comunidaes
import { MisComunidadesComponent } from './mis-comunidades/mis-comunidades.component';
import { PlanComponent } from '../pago/pages/plan/plan.component';
import { ReservasVirtualesComponent } from './pages/reservas-virtuales/reservas-virtuales.component';

//const routes: Routes = [{ path: '', component: UserComponent }];
import { HomepageComponent } from './homepage/homepage.component'; // importa el componente
//Para mis sesiones
import { SesionesComponent } from './sesiones/sesiones.component';
import { SeleccionarServicioComponent } from './seleccionar-servicio/seleccionar-servicio.component';


import { AdminComponent } from '../../layout/user-layout/admin/admin.component';
import { MembresiasComponent } from './membresias/membresias.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      

      // otras rutas hijas futuras pueden ir aquí

      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage/:id', component: HomepageComponent },
      { path: 'sesiones', component: SesionesComponent },  
      { path: 'seleccionar-servicio', component: SeleccionarServicioComponent },
      { path: 'reservas-virtuales', component: ReservasVirtualesComponent },
      { path: 'membresias', component: MembresiasComponent }

    ]
  },
   {path:'mis-comunidades',component:MisComunidadesComponent},
    {path:'seleccion-comunidad',component:SeleccionComunidadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {




 }
