import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  comunidadSeleccionada: any;
  ngOnInit(): void {
    const comunidadJson = localStorage.getItem('comunidad_seleccionada');
    if (comunidadJson) {
      this.comunidadSeleccionada = JSON.parse(comunidadJson);
    }
  }

}
