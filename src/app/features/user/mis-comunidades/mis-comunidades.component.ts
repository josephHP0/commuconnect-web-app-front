import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunidadService, ComunidadContexto } from '../services/comunidad.service';

@Component({
  selector: 'app-mis-comunidades',
  templateUrl: './mis-comunidades.component.html',
  styleUrls: ['./mis-comunidades.component.css']
})
export class MisComunidadesComponent implements OnInit {
  busqueda: string = '';
  comunidades: ComunidadContexto[] = [];
  comunidadesFiltradas: ComunidadContexto[] = [];

  constructor(
    private comunidadService: ComunidadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.comunidadService.obtenerComunidades().subscribe({
      next: (data) => {
        this.comunidades = data.map(comunidad => ({
          ...comunidad,
          imagen: comunidad.imagen
            ? `data:image/png;base64,${comunidad.imagen}`
            : 'assets/imagen-por-defecto.png' // fallback
        }));
        this.comunidadesFiltradas = [...this.comunidades];
      },
      error: (error) => {
        console.error('Error al obtener comunidades:', error);
      }
    });
  }

  filtrarComunidades(): void {
    const termino = this.busqueda.toLowerCase();
    this.comunidadesFiltradas = this.comunidades.filter(comunidad =>
      comunidad.nombre.toLowerCase().includes(termino)
    );
  }

  irASeleccionComunidad(): void {
    this.router.navigate(['/user/seleccion-comunidad']);
  }

  accederAComunidad(comunidad: ComunidadContexto): void {
    localStorage.setItem('comunidad_seleccionada', JSON.stringify(comunidad));
    localStorage.setItem('id_comunidad', comunidad.id_comunidad.toString());
    this.router.navigate(['/user/homepage', comunidad.id_comunidad]);
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/presentacion/inicio']);
  }
redirigirSegunEstado(comunidad: ComunidadContexto): void {
  const estado = comunidad.estado_membresia?.toLowerCase();

  localStorage.setItem('comunidad_seleccionada', JSON.stringify(comunidad));
  localStorage.setItem('id_comunidad', comunidad.id_comunidad.toString());

  switch (estado) {
    case 'activa':
      this.router.navigate(['/user/homepage', comunidad.id_comunidad]);
      break;
    case 'pendiente de pago':
      this.router.navigate(['/pago/plan']);
      break;
    case 'pendiente de plan':
      this.router.navigate(['/user/membresias']);
      break;
    case 'congelado':
    case 'inactiva':
      // No redirige. Botón está desactivado en la vista.
      break;
    default:
      console.warn(`Estado de membresía desconocido: ${estado}`);
      break;
  }
}


}
