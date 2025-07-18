import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionComponent } from './autenticacion.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SolicitarRecuperacionComponent } from './pages/solicitar-recuperacion/solicitar-recuperacion.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
const routes: Routes = [
 // { path: '', component: AutenticacionComponent }
    {path:'login',component:LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'olvide-contrasena', component: SolicitarRecuperacionComponent },
    { path: 'reset-password', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
