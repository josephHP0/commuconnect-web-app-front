import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentacionRoutingModule } from './presentacion-routing.module';
import { PresentacionComponent } from './presentacion.component';


@NgModule({
  declarations: [
    PresentacionComponent
  ],
  imports: [
    CommonModule,
    PresentacionRoutingModule
  ]
})
export class PresentacionModule { }
