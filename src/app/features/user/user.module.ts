import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { SeleccionComunidadComponent } from './seleccion-comunidad/seleccion-comunidad.component';

import { ReservasVirtualesComponent } from './pages/reservas-virtuales/reservas-virtuales.component';

import { MisComunidadesComponent } from './mis-comunidades/mis-comunidades.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SesionesComponent } from './sesiones/sesiones.component';
import { SeleccionarServicioComponent } from './seleccionar-servicio/seleccionar-servicio.component';

import { UserLayoutModule } from 'src/app/layout/user-layout/user-layout.module';
import { MembresiasComponent } from './membresias/membresias.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { SuspensionMembresiaComponent } from './membresias/pages/suspension-membresia/suspension-membresia.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { NuevaReservaPresencialComponent } from './pages/nueva-reserva-presencial/nueva-reserva-presencial.component';
import { NuevaReservaVirtualComponent } from './pages/nueva-reserva-virtual/nueva-reserva-virtual.component';
import { CompletarFormularioComponent } from './mis-reservas/completar-formulario/completar-formulario.component';

@NgModule({
  declarations: [
    UserComponent,
    SeleccionComunidadComponent,

    ReservasVirtualesComponent,

    MisComunidadesComponent,
    HomepageComponent,
    SesionesComponent,
    SeleccionarServicioComponent,
    MembresiasComponent,
    CambiarPasswordComponent,
    SuspensionMembresiaComponent,
    NuevaReservaPresencialComponent,
    NuevaReservaVirtualComponent,
    CompletarFormularioComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FormsModule,  // 👈 Asegúrate de tener esto aquí
    UserLayoutModule,
    NgxPaginationModule


  ]
})
export class UserModule { }
