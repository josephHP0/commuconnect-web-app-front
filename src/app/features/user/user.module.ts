import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Nuevas importaciones
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule

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

import { MisReservacionesComponent } from './mis-reservas/mis-reservaciones/mis-reservaciones.component';
import { ReservaDetalleComponent } from './mis-reservas/reserva-detalle/reserva-detalle.component';

// Importamos el módulo de calendario
import { CalendarModule, DateAdapter } from 'angular-calendar';
// Importamos el adaptador de `date-fns` correctamente desde `angular-calendar`
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { GestionCuentaComponent } from './gestion-cuenta/gestion-cuenta.component';
import { HistorialPagosComponent } from './membresias/pages/historial-pagos/historial-pagos.component';

const calendarConfig = CalendarModule.forRoot({
  provide: DateAdapter,
  useFactory: adapterFactory,
});








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
    CompletarFormularioComponent,
    MisReservacionesComponent,
    ReservaDetalleComponent,
    GestionCuentaComponent,
    HistorialPagosComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FormsModule,
    UserLayoutModule,
    NgxPaginationModule,
    HttpClientModule,  // Aquí agregamos HttpClientModule para habilitar las solicitudes HTTP
    calendarConfig
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Agregamos esto para permitir elementos personalizados como 'mwl-calendar-month'
})
export class UserModule { }
