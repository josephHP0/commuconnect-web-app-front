import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentacionRoutingModule } from './presentacion-routing.module';
import { PresentacionComponent } from './presentacion.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';


@NgModule({
  declarations: [
    PresentacionComponent,
    InicioComponent,
    ServiciosComponent
  ],
  imports: [
    CommonModule,
    PresentacionRoutingModule

  ]
})
export class PresentacionModule { }
