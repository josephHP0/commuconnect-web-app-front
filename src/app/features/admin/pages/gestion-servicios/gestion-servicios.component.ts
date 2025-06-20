import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosGestionService, Servicio } from '../../services/servicios-gestion.service';
import { NotificationData } from 'src/app/shared/components/notification/notification.component';

@Component({
  selector: 'app-gestion-servicios',
  templateUrl: './gestion-servicios.component.html',
  styleUrls: ['./gestion-servicios.component.css']
})
export class GestionServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  terminoBusqueda: string = '';

  // Notification
  showNotification: boolean = false;
  notificationData: NotificationData = {
    type: 'info',
    title: '',
    message: ''
  };

  // Confirmation dialog
  showConfirmDialog: boolean = false;
  servicioAEliminar: Servicio | null = null;

  constructor(
    private serviciosService: ServiciosGestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.serviciosService.obtenerTodosLosServicios().subscribe({
      next: (servicios: Servicio[]) => {
        this.servicios = servicios;
      },
      error: (error: any) => {
        console.error('Error al cargar servicios:', error);
        this.showNotificationMessage('error', 'Error al cargar', 'No se pudieron cargar los servicios. Por favor, inténtalo de nuevo.');
      }
    });
  }

  get serviciosFiltrados(): Servicio[] {
    if (!this.terminoBusqueda.trim()) {
      return this.servicios;
    }
    
    return this.servicios.filter(servicio =>
      servicio.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      servicio.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
  }

  agregarServicio(): void {
    this.router.navigate(['/admin/crear-servicio']);
  }

  editarServicio(idServicio: number): void {
    this.router.navigate(['/admin/editar-servicio', idServicio]);
  }

  eliminarServicio(servicio: Servicio): void {
    this.servicioAEliminar = servicio;
    this.showConfirmDialog = true;
  }

  confirmarEliminacion(): void {
    if (!this.servicioAEliminar) return;

    this.serviciosService.eliminarServicio(this.servicioAEliminar.id_servicio).subscribe({
      next: () => {
        this.servicios = this.servicios.filter(s => s.id_servicio !== this.servicioAEliminar!.id_servicio);
        this.showNotificationMessage('success', 'Servicio eliminado', `El servicio "${this.servicioAEliminar!.nombre}" ha sido eliminado exitosamente.`);
        this.servicioAEliminar = null;
        this.showConfirmDialog = false;
      },
      error: (error: any) => {
        console.error('Error al eliminar servicio:', error);
        this.showNotificationMessage('error', 'Error al eliminar', 'No se pudo eliminar el servicio. Por favor, inténtalo de nuevo.');
        this.showConfirmDialog = false;
      }
    });
  }

  cancelarEliminacion(): void {
    this.servicioAEliminar = null;
    this.showConfirmDialog = false;
  }

  verLocalesYProfesionales(servicio: Servicio): void {
    // Implementar navegación a pantalla de locales y profesionales
    console.log('Ver locales y profesionales para:', servicio.nombre);
  }

  private showNotificationMessage(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void {
    this.notificationData = {
      type,
      title,
      message,
      duration: type === 'success' ? 3000 : 0
    };
    this.showNotification = true;
  }

  onNotificationClose(): void {
    this.showNotification = false;
  }

  get confirmationMessage(): string {
    return this.servicioAEliminar 
      ? `¿Estás seguro de eliminar el servicio "${this.servicioAEliminar.nombre}"? Esta acción no se puede deshacer.`
      : '¿Estás seguro de realizar esta acción?';
  }
} 