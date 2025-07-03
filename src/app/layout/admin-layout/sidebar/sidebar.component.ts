import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


usuariosSubmenuOpen = false;
membresiasSubmenuOpen = false;

toggleUsuariosSubmenu() {
  this.usuariosSubmenuOpen = !this.usuariosSubmenuOpen;
}

toggleMembresiasSubmenu() {
  this.membresiasSubmenuOpen = !this.membresiasSubmenuOpen;
}


}
