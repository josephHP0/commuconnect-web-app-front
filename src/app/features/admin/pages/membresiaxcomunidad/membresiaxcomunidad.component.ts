import { Component, OnInit } from '@angular/core';
import { MembresiaxcomunidadService, PlanPorComunidad } from '../../services/membresiaxcomunidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membresiaxcomunidad',
  templateUrl: './membresiaxcomunidad.component.html',
  styleUrls: ['./membresiaxcomunidad.component.css']
})
export class PlanesPorComunidadComponent implements OnInit {
  planes: PlanPorComunidad[] = [];
  planesFiltrados: PlanPorComunidad[] = [];
  buscarTexto: string = '';
  idComunidad: number = 0;
  paginaActual = 1;
  entradasPorPagina = 4;

  constructor(private planesService: MembresiaxcomunidadService) {}

  ngOnInit(): void {
    //this.idComunidad = Number(localStorage.getItem('id_comunidad'));
    this.idComunidad = 1; // ID de comunidad temporal para pruebas

    this.cargarPlanes();
  }

  cargarPlanes(): void {
    this.planesService.obtenerPlanesPorComunidad(this.idComunidad).subscribe({
      next: (res) => {
        this.planes = res;
        this.aplicarFiltro();
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los planes.', 'error');
      }
    });
  }

  aplicarFiltro(): void {
    const texto = this.buscarTexto.toLowerCase();
    this.planesFiltrados = this.planes.filter(plan =>
      plan.nombre.toLowerCase().includes(texto)
    );
    this.paginaActual = 1;
  }

  eliminarPlan(idPlan: number): void {
    Swal.fire({
      title: '¿Eliminar plan?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.planesService.eliminarPlan(idPlan).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El plan ha sido eliminado.', 'success');
            this.cargarPlanes();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el plan.', 'error');
          }
        });
      }
    });
  }

  verDetalle(plan: PlanPorComunidad): void {
    Swal.fire('Detalle del Plan', `Nombre: ${plan.nombre}\nDuración: ${plan.duracion} meses\nTopes: ${plan.topes ?? '-'}\nPrecio: S/. ${plan.precio.toFixed(2)}`, 'info');
  }

  getPlanesPaginados(): PlanPorComunidad[] {
    const inicio = (this.paginaActual - 1) * this.entradasPorPagina;
    return this.planesFiltrados.slice(inicio, inicio + this.entradasPorPagina);
  }

  totalPaginas(): number {
    return Math.ceil(this.planesFiltrados.length / this.entradasPorPagina);
  }

  cambiarPagina(nueva: number): void {
    this.paginaActual = nueva;
  }
}