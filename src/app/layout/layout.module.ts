import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { SidebarAdminComponent } from './admin/sidebar-admin/sidebar-admin.component';
import { FooterAdminComponent } from './admin/footer-admin/footer-admin.component';
import { HeaderUserComponent } from './user/header-user/header-user.component';
import { SidebarUserComponent } from './user/sidebar-user/sidebar-user.component';
import { FooterUserComponent } from './user/footer-user/footer-user.component';




@NgModule({
  declarations: [


    HeaderAdminComponent,
        SidebarAdminComponent,
        FooterAdminComponent,
        HeaderUserComponent,
        SidebarUserComponent,
        FooterUserComponent
  ],
  imports: [
    CommonModule
  ],
   exports: [

    HeaderAdminComponent,
    SidebarAdminComponent,
    FooterAdminComponent,
    HeaderUserComponent,
    SidebarUserComponent,
    FooterUserComponent

  ]
})
export class LayoutModule { }
