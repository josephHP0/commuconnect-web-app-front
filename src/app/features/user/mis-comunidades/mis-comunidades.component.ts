import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis-comunidades',
  templateUrl: './mis-comunidades.component.html',
  styleUrls: ['./mis-comunidades.component.css']
})
export class MisComunidadesComponent {
  // Búsqueda actual
  busqueda: string = '';

  // Lista completa de comunidades
  comunidades = [
    {
      nombre: 'Mamás Primerizas',
      imagen: '/assets/mamas-primerizas.png',
      servicios: ['Sesiones de Yoga', 'Atención nutricional']
    },
    {
      nombre: 'Runners',
      imagen: '/assets/comunidad_runners.jpg',
      servicios: ['Acceso a gimnasios', 'Atención nutricional']
    }
  ];

  // Lista que se va filtrando
  comunidadesFiltradas = [...this.comunidades];

  constructor(private router: Router) {}

  // Redirección a la pantalla de selección
  irASeleccionComunidad() {
    this.router.navigate(['/user/seleccion-comunidad']);
  }

  // Filtra la lista en tiempo real según la búsqueda
  filtrarComunidades() {
    const termino = this.busqueda.toLowerCase();
    this.comunidadesFiltradas = this.comunidades.filter(comunidad =>
      comunidad.nombre.toLowerCase().includes(termino)
    );
  }
}