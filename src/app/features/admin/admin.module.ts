import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';


import { RegistroComunidadComponent } from './pages/registro-comunidad/registro-comunidad.component';
import { AdminLayoutModule } from 'src/app/layout/admin-layout/admin-layout.module';

import { FormsModule } from '@angular/forms';
import { ListaComunidadComponent } from './pages/lista-comunidad/lista-comunidad.component';
import { EditarComunidadComponent } from './pages/editar-comunidad/editar-comunidad.component';
import { ListaClienteComponent } from './pages/usuario-crud/lista-cliente/lista-cliente.component';
import { ServiciosPorComunidadComponent } from './pages/servicios-por-comunidad/servicios-por-comunidad.component';
import { NuevoServicioPorComunidadComponent } from './pages/nuevo-servicio-por-comunidad/nuevo-servicio-por-comunidad.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CargarClienteMasivoComponent } from './pages/usuario-crud/cargar-cliente-masivo/cargar-cliente-masivo.component';
import { GestionServiciosComponent } from './pages/gestion-servicios/gestion-servicios.component';
import { CrearServicioComponent } from './pages/crear-servicio/crear-servicio.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlanesPorComunidadComponent } from './pages/membresiaxcomunidad/membresiaxcomunidad.component';


@NgModule({
  declarations: [
    AdminComponent,
    RegistroComunidadComponent,
    ListaComunidadComponent,
    EditarComunidadComponent,
    ListaClienteComponent,
    ServiciosPorComunidadComponent,
    NuevoServicioPorComunidadComponent,
    CargarClienteMasivoComponent,
    GestionServiciosComponent,
    CrearServicioComponent,
    PlanesPorComunidadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    AdminLayoutModule,
    FormsModule,
    ScrollingModule,
    SharedModule
  ]
})
export class AdminModule { }
