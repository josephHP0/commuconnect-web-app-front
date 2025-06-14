import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';


import { SeleccionComunidadComponent } from './seleccion-comunidad/seleccion-comunidad.component';

import { ReservasVirtualesComponent } from './pages/reservas-virtuales/reservas-virtuales.component';

import { MisComunidadesComponent } from './mis-comunidades/mis-comunidades.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SesionesComponent } from './sesiones/sesiones.component';
import { SeleccionarServicioComponent } from './seleccionar-servicio/seleccionar-servicio.component';

import { UserLayoutModule } from 'src/app/layout/user-layout/user-layout.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { NuevaReservaPresencialComponent } from './pages/nueva-reserva-presencial/nueva-reserva-presencial.component';

@NgModule({
  declarations: [
    UserComponent,
    SeleccionComunidadComponent,

    ReservasVirtualesComponent,

    MisComunidadesComponent,
    HomepageComponent,
    SesionesComponent,
    SeleccionarServicioComponent,
    NuevaReservaPresencialComponent

  ],
  imports: [
    CommonModule,
    UserRoutingModule,

    FormsModule,  // 👈 Asegúrate de tener esto aquí
    UserLayoutModule,
    NgxPaginationModule


  ]
})
export class UserModule { }
