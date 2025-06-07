import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../services/servicio.service';

@Component({
  selector: 'app-seleccionar-servicio',
  templateUrl: './seleccionar-servicio.component.html',
  styleUrls: ['./seleccionar-servicio.component.css']
})
export class SeleccionarServicioComponent implements OnInit {
  servicios: any[] = [];
  idComunidad: number = 3;
  topes: number = 0;

  constructor(
    private servicioService: ServicioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerServicios();
    this.obtenerTopes();
  }
/*
  obtenerServicios() {
    this.servicioService.obtenerServiciosPorComunidad(this.idComunidad)
      .subscribe({
        next: (data) => this.servicios = data,
        error: (err) => console.error('Error al cargar servicios', err)
      });
  }
*/
obtenerServicios() {
  this.servicioService.obtenerServiciosPorComunidad(this.idComunidad)
    .subscribe({
      next: (data) => {
        console.log('Servicios recibidos:', data);
        this.servicios = data.servicios;  // ← Aquí el cambio importante
      },
      error: (err) => console.error('Error al cargar servicios', err)
    });
}






  obtenerTopes() {
    this.servicioService.obtenerTopesPorComunidad(this.idComunidad)
      .subscribe({
        next: (res) => this.topes = res.tope || 0,
        error: (err) => console.error('Error al cargar topes', err)
      });
  }

  seleccionarServicio(servicioId: number) {
    this.router.navigate(['/user/sesiones'], {
      queryParams: { servicioId }
    });
  }

/*
  seleccionarServicio(servicio: any) {
  if (servicio.tipo === 'Presencial') {
    // Si es presencial, redirige a sesiones presenciales
    this.router.navigate(['/user/sesiones'], {
      queryParams: { servicioId: servicio.id }
    });
  } else if (servicio.tipo === 'Virtual') {
    // Por ahora solo muestra mensaje, puedes cambiar la ruta cuando esté lista
    console.log('Redirigir a sesiones virtuales (pendiente implementar)');
    // this.router.navigate(['/user/sesiones-virtual'], {
    //   queryParams: { servicioId: servicio.id }
    // });
  } else {
    console.warn('Tipo de servicio no reconocido:', servicio.tipo);
  }
}
*/

}
