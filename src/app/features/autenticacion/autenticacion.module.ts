import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { AutenticacionComponent } from './autenticacion.component';
import { LoginComponent } from './pages/login/login.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AutenticacionComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    FormsModule
  ]
})
export class AutenticacionModule { }
