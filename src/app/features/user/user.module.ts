import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';


import { LayoutModule } from '../../layout/layout.module';
import { SeleccionComunidadComponent } from './seleccion-comunidad/seleccion-comunidad.component';
import { ReservasVirtualesComponent } from './pages/reservas-virtuales/reservas-virtuales.component';


@NgModule({
  declarations: [
    UserComponent,
    SeleccionComunidadComponent,
    ReservasVirtualesComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,  // 
    LayoutModule
  ]
})
export class UserModule { }
