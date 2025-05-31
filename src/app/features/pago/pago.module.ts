import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagoRoutingModule } from './pago-routing.module';
import { PagoComponent } from './pago.component';
import { PlanComponent } from './pages/plan/plan.component';
import { SelectionComponent } from './pages/selection/selection.component';




@NgModule({
  declarations: [
    PagoComponent,
    PlanComponent,
    SelectionComponent
  ],
  imports: [
    CommonModule,
    PagoRoutingModule
  ]
})
export class PagoModule { }
