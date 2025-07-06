import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalesService, LocalOut } from '../../services/locales.service';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {
  locales: LocalOut[] = [];
  idServicio: number = 0;
  nombreServicio: string = '';
  cargando: boolean = false;
  error: string = '';

  // Paginación
  paginaActual: number = 1;
  elementosPorPagina: number = 10;
  totalElementos: number = 0;

  // Para usar Math en el template
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localesService: LocalesService
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Solo cerrar dropdowns si el click no fue en un botón dropdown
    const target = event.target as HTMLElement;
    if (target && !target.closest('.dropdown')) {
      this.cerrarTodosLosMenus();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idServicio = +params['id'];
      console.log('ID Servicio recibido en LocalesComponent:', this.idServicio); // Debug
      if (this.idServicio) {
        this.cargarLocales();
      } else {
        console.error('No se recibió un ID de servicio válido');
        this.error = 'ID de servicio no válido';
      }
    });

    // Obtener el nombre del servicio desde el state del router si está disponible
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.nombreServicio = navigation.extras.state['nombreServicio'] || 'Servicio';
      console.log('Nombre del servicio:', this.nombreServicio); // Debug
    }
  }

  cargarLocales(): void {
    this.cargando = true;
    this.error = '';
    console.log('Cargando locales para servicio ID:', this.idServicio); // Debug

    this.localesService.obtenerLocalesPorServicio(this.idServicio).subscribe({
      next: (locales) => {
        console.log('Locales cargados exitosamente:', locales.length, 'locales');
        // Inicializar showMenu para cada local
        this.locales = locales.map(local => ({
          ...local,
          showMenu: false
        }));
        this.totalElementos = locales.length;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar locales:', error);
        console.error('Status del error:', error.status); // Debug
        console.error('Mensaje del error:', error.message); // Debug
        
        this.cargando = false;
        
        // Manejo específico de diferentes tipos de error
        if (error.status === 404) {
          this.error = 'No se encontraron locales para este servicio.';
        } else if (error.status === 401) {
          this.error = 'No tienes autorización para ver estos locales.';
        } else if (error.status === 0) {
          this.error = 'Error de conexión. Verifica que el servidor esté funcionando.';
        } else {
          this.error = error.error?.detail || error.error?.message || 'Error al cargar los locales. Por favor, intente nuevamente.';
        }
      }
    });
  }

  get localesPaginados(): LocalOut[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.locales.slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(this.totalElementos / this.elementosPorPagina);
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

  // Control del dropdown
  toggleMenu(local: LocalOut, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    // Cerrar todos los demás menús
    this.locales.forEach(l => {
      if (l !== local) {
        l.showMenu = false;
      }
    });
    // Toggle del menú actual
    local.showMenu = !local.showMenu;
  }

  // Acciones de locales
  verSesiones(local: LocalOut): void {
    this.cerrarTodosLosMenus(); // Cerrar todos los menús
    console.log('Ver sesiones para local:', local.nombre);
    // Navegar a la pantalla de sesiones para este local específico
    // TODO: Implementar navegación a sesiones por local
    alert(`Funcionalidad "Ver sesiones" para el local "${local.nombre}" será implementada próximamente.`);
  }






  

  editarLocal(local: LocalOut): void {
    this.cerrarTodosLosMenus(); // Cerrar todos los menús
    console.log('Editar local:', local);
    // Mostrar toda la información del local
    const info = `
INFORMACIÓN DEL LOCAL:

ID: ${local.id_local}
Nombre: ${local.nombre || 'No especificado'}
Dirección: ${local.direccion_detallada || 'No especificada'}
Responsable: ${local.responsable || 'No asignado'}
Departamento ID: ${local.id_departamento || 'No especificado'}
Distrito ID: ${local.id_distrito || 'No especificado'}
Servicio ID: ${local.id_servicio || 'No especificado'}
Link: ${local.link || 'No especificado'}
Estado: ${local.estado || 'No especificado'}
Fecha de creación: ${local.fecha_creacion || 'No especificada'}
Creado por: ${local.creado_por || 'No especificado'}
Fecha de modificación: ${local.fecha_modificacion || 'No especificada'}
Modificado por: ${local.modificado_por || 'No especificado'}
    `;
    
    alert(info);
    // TODO: Implementar formulario de edición completo
  }

  eliminarLocal(local: LocalOut): void {
    this.cerrarTodosLosMenus(); // Cerrar todos los menús
    if (confirm(`¿Está seguro de que desea eliminar el local "${local.nombre}"?`)) {
      this.localesService.eliminarLocal(local.id_local).subscribe({
        next: () => {
          console.log('Local eliminado exitosamente');
          this.cargarLocales(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error al eliminar local:', error);
          alert('Error al eliminar el local. Por favor, intente nuevamente.');
        }
      });
    }
  }

  // Acciones de navegación
  cargarSesiones(): void {
    console.log('Cargar sesiones para servicio:', this.idServicio);
    this.router.navigate(['/admin/cargar-sesiones-masivo', this.idServicio], {
      state: { nombreServicio: this.nombreServicio }
    });
  }

  cargarLocalesArchivo(): void {
    console.log('Cargar locales desde archivo para servicio:', this.idServicio);
    this.router.navigate(['/admin/cargar-locales-masivo', this.idServicio], {
      state: { nombreServicio: this.nombreServicio }
    });
  }

  crearLocal(): void {
    console.log('Crear nuevo local para servicio:', this.idServicio);
    // TODO: Implementar navegación a creación de local
    alert('Funcionalidad "Crear Local" será implementada próximamente.');
    this.router.navigate(['/admin/crear-local-unitario']);
  }

  volver(): void {
    this.router.navigate(['/admin/gestion-servicios']);
  }

  // Método para cerrar todos los menús
  cerrarTodosLosMenus(): void {
    this.locales.forEach(local => {
      local.showMenu = false;
    });
  }
}
