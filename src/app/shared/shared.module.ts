import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanCardComponent } from './components/plan-card/plan-card.component';
import { HeaderPublicoComponent } from './components/header-publico/header-publico.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PlanCardComponent, HeaderPublicoComponent],
  imports: [CommonModule, RouterModule],
  exports: [PlanCardComponent,HeaderPublicoComponent] 
})
export class SharedModule {}