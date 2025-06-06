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
  idComunidad: number = 1;
  topes: number = 0;

  constructor(
    private servicioService: ServicioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerServicios();
    this.obtenerTopes();
  }

  obtenerServicios() {
    this.servicioService.obtenerServiciosPorComunidad(this.idComunidad)
      .subscribe({
        next: (data) => this.servicios = data,
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
}
