import { Component, OnInit } from '@angular/core';
import { PlanesCrudService, Plan } from '../../services/planes-crud.service';

@Component({
  selector: 'app-planes-crud',
  templateUrl: './planes-crud.component.html',
  styleUrls: ['./planes-crud.component.css']
})
export class PlanesCrudComponent implements OnInit {
  planes: Plan[] = [];
  buscar = '';

  // Paginación
  page = 1;
  pageSize = 5;

  menuAbierto: number | null = null;

  mostrarModal = false;
  planADesactivar: any = null;

  mostrarModalPlan = false;
  planSeleccionado: Plan | null = null;

  mostrarModalEditar = false;
  planAEditar: Plan | null = null;

  constructor(private planesService: PlanesCrudService) {}

  ngOnInit() {
    this.planesService.getPlanes().subscribe(data => {
      this.planes = data;
    });
  }

  get planesFiltrados() {
    return this.planes.filter(plan =>
      plan.titulo.toLowerCase().includes(this.buscar.toLowerCase())
    );
  }

  get pagedPlanes() {
    const start = (this.page - 1) * this.pageSize;
    return this.planesFiltrados.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.planesFiltrados.length / this.pageSize);
  }

  setPage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
    }
  }

  abrirMenu(index: number) {
    this.menuAbierto = index;
  }

  cerrarMenu() {
    this.menuAbierto = null;
  }

  editarPlan(plan: any) {
    this.planesService.obtenerPlanPorId(plan.id_plan).subscribe({
      next: (planDetalle) => {
        this.planAEditar = planDetalle;
        this.mostrarModalEditar = true;
      },
      error: (err) => {
        console.error('Error al obtener plan', err);
      }
    });
    this.cerrarMenu();
  }

  actualizarPlan(plan: any) {
    // Lógica para actualizar
    this.cerrarMenu();
  }

  desactivarPlan(plan: any) {
    this.planADesactivar = plan;
    this.mostrarModal = true;
    this.cerrarMenu();
  }

  confirmarDesactivacion() {
    if (!this.planADesactivar) return;

    this.planesService.eliminarPlan(this.planADesactivar.id_plan).subscribe({
      next: () => {
        // Cambia el estado del plan a '0' (inactivo) en el array local
        const plan = this.planes.find(p => p.id_plan === this.planADesactivar.id_plan);
        if (plan) {
          plan.estado = '0';
        }
        this.mostrarModal = false;
        this.planADesactivar = null;
      },
      error: (err) => {
        console.error('Error al eliminar plan', err);
        this.mostrarModal = false;
        this.planADesactivar = null;
      }
    });
  }

  cancelarDesactivacion() {
    this.mostrarModal = false;
    this.planADesactivar = null;
  }



  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.planAEditar = null;
  }
}