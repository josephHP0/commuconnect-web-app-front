import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentacionRoutingModule } from './presentacion-routing.module';
import { PresentacionComponent } from './presentacion.component';
import { InicioComponent } from './pages/inicio/inicio.component';



@NgModule({
  declarations: [
    PresentacionComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    PresentacionRoutingModule

  ]
})
export class PresentacionModule { }
