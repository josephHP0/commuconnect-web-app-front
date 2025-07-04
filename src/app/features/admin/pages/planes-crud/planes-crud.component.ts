import { Component, OnInit } from '@angular/core';
import { PlanesCrudService, Plan } from '../../services/planes-crud.service';

@Component({
  selector: 'app-planes-crud',
  templateUrl: './planes-crud.component.html',
  styleUrls: ['./planes-crud.component.css']
})
export class PlanesCrudComponent implements OnInit {
  planes: Plan[] = [];
  buscar: string = '';
  page: number = 1;
  pageSize: number = 5;

  // Paginación
  menuAbierto: number | null = null;
  menuPos = { top: 0, left: 0 };

  mostrarModal = false;
  planADesactivar: any = null;

  mostrarModalPlan = false;
  planSeleccionado: Plan | null = null;

  mostrarModalEditar = false;
  planAEditar: Plan | null = null;

  mostrarModalCrear = false;
  nuevoPlan = {
    titulo: '',
    descripcion: '',
    duracion: null,
    topes: null,
    precio: null
  };

  mostrarModalDetalle = false;
  planDetalle: Plan | null = null;

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

  abrirMenu(index: number, event: MouseEvent) {
    this.menuAbierto = index;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.menuPos = {
      top: rect.top + 4, // +2 para un pequeño margen
      left: rect.left + window.scrollX
    };
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

  guardarEdicionPlan() {
    if (!this.planAEditar) return;
    this.planesService.actualizarPlan(this.planAEditar).subscribe({
      next: (planActualizado) => {
        // Actualiza el array local si es necesario
        const idx = this.planes.findIndex(p => p.id_plan === this.planAEditar!.id_plan);
        if (idx !== -1) {
          this.planes[idx] = { ...this.planAEditar! };
        }
        this.mostrarModalEditar = false;
        this.planAEditar = null;
      },
      error: (err) => {
        alert('Error al actualizar el plan');
        console.error(err);
      }
    });
  }

  abrirModalCrear() {
    this.nuevoPlan = {
      titulo: '',
      descripcion: '',
      duracion: null,
      topes: null,
      precio: null
    };
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }

  crearPlan() {
    // Validación simple
    if (
      !this.nuevoPlan.titulo ||
      !this.nuevoPlan.descripcion ||
      this.nuevoPlan.duracion == null ||
      this.nuevoPlan.topes == null ||
      this.nuevoPlan.precio == null
    ) {
      alert('Completa todos los campos');
      return;
    }

    this.planesService.crearPlan({
      titulo: this.nuevoPlan.titulo,
      descripcion: this.nuevoPlan.descripcion,
      duracion: Number(this.nuevoPlan.duracion),
      topes: Number(this.nuevoPlan.topes),
      precio: Number(this.nuevoPlan.precio)
    }).subscribe({
      next: (planCreado) => {
        this.planes.push(planCreado);
        this.cerrarModalCrear();
      },
      error: (err) => {
        alert('Error al crear el plan');
        console.error(err);
      }
    });
  }

  verDetallePlan(plan: any) {
    this.planesService.obtenerPlanPorId(plan.id_plan).subscribe({
      next: (planDetalle) => {
        this.planDetalle = planDetalle;
        this.mostrarModalDetalle = true;
      },
      error: (err) => {
        console.error('Error al obtener detalle', err);
      }
    });
    this.cerrarMenu();
  }

  cerrarModalDetalle() {
    this.mostrarModalDetalle = false;
    this.planDetalle = null;
  }

  onBuscarChange() {
    this.page = 1;
  }
}