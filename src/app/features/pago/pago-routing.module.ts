import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagoComponent } from './pago.component';
import { PlanComponent } from './pages/plan/plan.component';
import { SelectionComponent } from './pages/selection/selection.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';




const routes: Routes = [
 // { path: '', component: AutenticacionComponent }
    { path: '', redirectTo: 'plan', pathMatch: 'full' },
    {path:'plan',component:PlanComponent},
    { path: 'selection', component: SelectionComponent },
    { path: 'confirmacion', component: ConfirmacionComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagoRoutingModule { }

