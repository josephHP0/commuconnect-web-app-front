import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent {
  planSeleccionado: string = '';
  precioSeleccionado: string = '';
  id_plan: number = 0;
  // Supongamos que tienes estos datos del usuario desde antes o un servicio
  usuario = {
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@example.com',
    numeroTarjeta: '1234-5678-9012-3456',
    fechaExpiracion: '12/25',
    cvv: '123'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Capturamos los datos del plan desde la URL
    this.route.queryParams.subscribe(params => {
      this.planSeleccionado = params['titulo'];
      this.precioSeleccionado = params['precio'];
      this.id_plan = +params['id_plan']; // + convierte a number
    });
  }
}
