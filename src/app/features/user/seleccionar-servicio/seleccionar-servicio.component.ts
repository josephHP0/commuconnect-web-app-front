import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccionar-servicio',
  templateUrl: './seleccionar-servicio.component.html',
  styleUrls: ['./seleccionar-servicio.component.css']
})
export class SeleccionarServicioComponent implements OnInit {
  servicios: any[] = [];
  idComunidad: number = 1; // puedes setearlo dinámicamente si lo tienes en sesión
  topes: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.obtenerServicios();
    this.obtenerTopes();
  }

  obtenerServicios() {
    this.http.get<any[]>(`/usuario/comunidad/${this.idComunidad}`)
      .subscribe({
        next: (data) => this.servicios = data,
        error: (err) => console.error('Error al cargar servicios', err)
      });
  }

  obtenerTopes() {
    this.http.get<any>(`/usuario/comunidad/${this.idComunidad}/topes`)
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
