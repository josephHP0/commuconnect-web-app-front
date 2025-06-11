import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // ✅ Importación agregada
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { UserLayoutModule } from "./layout/user-layout/user-layout.module";
import { AuthInterceptor } from './features/autenticacion/auth.interceptor';

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
    ReactiveFormsModule,
    LayoutModule,
    UserLayoutModule
],
  providers: [//agregar el interceptor de autenticación
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
