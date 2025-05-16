import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // ✅ Importación agregada
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
    // Agrega aquí tus componentes como SeleccionComunidadComponent si no están en otro módulo
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // ✅ Importación agregada
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
