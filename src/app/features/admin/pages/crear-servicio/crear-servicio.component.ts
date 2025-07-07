import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosGestionService, Servicio, CrearServicioRequest } from '../../services/servicios-gestion.service';
import { NotificationData } from 'src/app/shared/components/notification/notification.component';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {
  modoEdicion = false;
  idServicio: number | null = null;
  
  // Formulario
  nombre: string = '';
  descripcion: string = '';
  modalidad: 'Presencial' | 'Virtual' = 'Presencial';
  imagenFile: File | null = null;
  imagenPreview: string | null = null;
  
  // Estados
  cargando: boolean = false;
  guardando: boolean = false;

  // Notification
  showNotification: boolean = false;
  notificationData: NotificationData = {
    type: 'info',
    title: '',
    message: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviciosService: ServiciosGestionService
  ) {}

  ngOnInit(): void {
    // Si hay un id en la ruta, es edición
    const id = this.route.snapshot.paramMap.get('id');
    this.modoEdicion = !!id;

    if (this.modoEdicion) {
      this.idServicio = +id!;
      this.cargarServicio();
    }
  }

  cargarServicio(): void {
    if (!this.idServicio) return;
    
    this.cargando = true;
    this.serviciosService.obtenerServicioPorId(this.idServicio).subscribe({
      next: (servicio: Servicio) => {
        this.nombre = servicio.nombre;
        this.descripcion = servicio.descripcion;
        this.modalidad = servicio.modalidad;
        this.imagenPreview = servicio.imagen ?? null; // Asegúrate que este campo sea la URL completa o relativa correcta
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar servicio:', error);
        this.cargando = false;
        
        if (error.status === 404) {
          this.showNotificationMessage('error', 'Servicio no encontrado', 'El servicio no fue encontrado. El endpoint GET /api/services/{id}/ no está implementado en el backend.');
        } else {
          this.showNotificationMessage('error', 'Error al cargar', 'No se pudo cargar la información del servicio. Por favor, inténtalo de nuevo.');
        }
        
        // Redirigir de vuelta a la lista después de cerrar la notificación
        setTimeout(() => {
          this.router.navigate(['/admin/gestion-servicios']);
        }, 3000);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        this.showNotificationMessage('warning', 'Archivo inválido', 'Por favor selecciona un archivo de imagen válido (JPG, PNG, etc.)');
        return;
      }
      
      // Validar tamaño (máximo 4MB)
      if (file.size > 4 * 1024 * 1024) {
        this.showNotificationMessage('warning', 'Archivo muy grande', 'El archivo es demasiado grande. El tamaño máximo permitido es 4MB.');
        return;
      }
      
      this.imagenFile = file;
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  eliminarImagen(): void {
    this.imagenFile = null;
    this.imagenPreview = null;
  }

  guardarServicio(): void {
    if (!this.validarFormulario()) {
      return;
    }

    this.guardando = true;
    
    const servicioData: CrearServicioRequest = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      modalidad: this.modalidad,
      imagen: this.imagenFile || undefined
    };

    const operacion = this.modoEdicion && this.idServicio
      ? this.serviciosService.actualizarServicio(this.idServicio, servicioData)
      : this.serviciosService.crearServicio(servicioData);

    operacion.subscribe({
      next: (servicio: Servicio) => {
        this.guardando = false;
        const titulo = this.modoEdicion ? '¡Servicio actualizado!' : '¡Servicio creado!';
        const mensaje = this.modoEdicion 
          ? 'El servicio ha sido actualizado exitosamente.' 
          : 'El servicio ha sido creado exitosamente.';
        
        this.showNotificationMessage('success', titulo, mensaje);
        
        // Redirigir después de mostrar la notificación
        setTimeout(() => {
          this.router.navigate(['/admin/gestion-servicios']);
        }, 2000);
      },
      error: (error: any) => {
        console.error('Error al guardar servicio:', error);
        this.guardando = false;
        this.showNotificationMessage('error', 'Error al guardar', 'No se pudo guardar el servicio. Por favor, verifica los datos e inténtalo de nuevo.');
      }
    });
  }

  validarFormulario(): boolean {
    if (!this.nombre.trim()) {
      this.showNotificationMessage('warning', 'Campo requerido', 'El nombre del servicio es requerido.');
      return false;
    }
    
    if (!this.descripcion.trim()) {
      this.showNotificationMessage('warning', 'Campo requerido', 'La descripción del servicio es requerida.');
      return false;
    }
    
    return true;
  }

  cancelar(): void {
    this.router.navigate(['/admin/gestion-servicios']);
  }

  private showNotificationMessage(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void {
    this.notificationData = {
      type,
      title,
      message,
      duration: type === 'success' ? 3000 : 0 // Auto-close success notifications
    };
    this.showNotification = true;
  }

  onNotificationClose(): void {
    this.showNotification = false;
  }

  get tituloFormulario(): string {
    return this.modoEdicion ? 'Editar Servicio' : 'Crear Servicio';
  }

  get textoBotonGuardar(): string {
    if (this.guardando) {
      return this.modoEdicion ? 'Actualizando...' : 'Creando...';
    }
    return this.modoEdicion ? 'Actualizar Servicio' : 'Crear Servicio';
  }
}