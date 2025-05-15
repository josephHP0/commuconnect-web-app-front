import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';


import { LayoutModule } from '../../layout/layout.module';
import { SeleccionComunidadComponent } from './seleccion-comunidad/seleccion-comunidad.component';


@NgModule({
  declarations: [
    UserComponent,
    SeleccionComunidadComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    LayoutModule
  ]
})
export class UserModule { }
