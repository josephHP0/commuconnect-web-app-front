import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

//Para las comunidades
import { SeleccionComunidadComponent } from './seleccion-comunidad/seleccion-comunidad.component';

//const routes: Routes = [{ path: '', component: UserComponent }];
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'seleccion-comunidad', component: SeleccionComunidadComponent },
      // otras rutas hijas futuras pueden ir aquí
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {




 }
