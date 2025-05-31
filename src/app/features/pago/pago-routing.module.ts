import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagoComponent } from './pago.component';
import { PlanComponent } from './pages/plan/plan.component';
import { SelectionComponent } from './pages/selection/selection.component';




const routes: Routes = [
 // { path: '', component: AutenticacionComponent }
    { path: '', redirectTo: 'plan', pathMatch: 'full' },
    {path:'plan',component:PlanComponent},
    { path: 'selection', component: SelectionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagoRoutingModule { }

