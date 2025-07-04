import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PlanesCrudComponent } from './planes-crud.component';

const routes: Routes = [
  { path: '', component: PlanesCrudComponent }
];

@NgModule({
  declarations: [PlanesCrudComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [PlanesCrudComponent]
})
export class PlanesCrudModule { }