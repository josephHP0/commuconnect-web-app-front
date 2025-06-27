import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-sesion-por-profesional',
  templateUrl: './detalle-sesion-por-profesional.component.html',
  styleUrls: ['./detalle-sesion-por-profesional.component.css']
})
export class DetalleSesionPorProfesionalComponent {

   personas = [
    {
      nombres: 'Alessia Amanda',
      apellidos: 'Cántaro Márquez',
      comunidad: 'Club de Running',
      entrega: true
    }
  ];

}
