import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanCardComponent } from './components/plan-card/plan-card.component';

@NgModule({
  declarations: [PlanCardComponent],
  imports: [CommonModule],
  exports: [PlanCardComponent] 
})
export class SharedModule {}