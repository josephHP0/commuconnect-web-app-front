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

@NgModule({
  declarations: [
    AdminComponent,
    RegistroComunidadComponent,
    ListaComunidadComponent,
    EditarComunidadComponent,
    ListaClienteComponent,
    ServiciosPorComunidadComponent,
    NuevoServicioPorComunidadComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminLayoutModule,
    FormsModule,
    ScrollingModule
  


  ]
})
export class AdminModule { }
