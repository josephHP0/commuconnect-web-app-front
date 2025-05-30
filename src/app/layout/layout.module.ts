import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
//import { SidebarAdminComponent } from './admin/sidebar-admin/sidebar-admin.component';
//import { FooterAdminComponent } from './admin/footer-admin/footer-admin.component';


//import {AdminLayoutComponent} from './admin-layout/admin/admin-layout.component'
//import {SidebarComponent} from './admin-layout/sidebar/sidebar.component'
//import {FooterComponent} from './admin-layout/footer/footer.component'



//import { HeaderUserComponent } from './user/header-user/header-user.component'
//import { SidebarUserComponent } from './user/sidebar-user/sidebar-user.component'
//import { FooterUserComponent } from './user/footer-user/footer-user.component'


import {HeaderComponent} from './user-layout/header/header.component'
import {SidebarComponent} from './user-layout/sidebar/sidebar.component'



@NgModule({
  declarations: [

/*
    HeaderAdminComponent,
    SidebarAdminComponent,
    FooterAdminComponent,
    HeaderUserComponent,
    SidebarUserComponent,
    FooterUserComponent
*/
   // HeaderComponent,
   // SidebarComponent

  ],
  imports: [
    CommonModule
  ],
  exports: [

    /*
    HeaderAdminComponent,
    SidebarAdminComponent,
    FooterAdminComponent,
    HeaderUserComponent,
    SidebarUserComponent,
    FooterUserComponent
    */

   // HeaderComponent,
    //SidebarComponent


  ]
})
export class LayoutModule { }
