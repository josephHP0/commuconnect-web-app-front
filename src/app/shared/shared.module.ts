import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanCardComponent } from './components/plan-card/plan-card.component';
import { HeaderPublicoComponent } from './components/header-publico/header-publico.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PlanCardComponent, 
    HeaderPublicoComponent,
    NotificationComponent,
    ConfirmationDialogComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    PlanCardComponent,
    HeaderPublicoComponent,
    NotificationComponent,
    ConfirmationDialogComponent
  ] 
})
export class SharedModule {}