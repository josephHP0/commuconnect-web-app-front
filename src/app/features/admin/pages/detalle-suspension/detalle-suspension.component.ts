import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuspensionAdminService, SuspensionDetail } from '../../services/suspension-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-suspension',
  templateUrl: './detalle-suspension.component.html',
  styleUrls: ['./detalle-suspension.component.css']
})
export class DetalleSuspensionComponent implements OnInit {
  suspension: SuspensionDetail | null = null;
  loading = false;
  error = '';
  idSuspension: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suspensionService: SuspensionAdminService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idSuspension = +params['id'];
      if (this.idSuspension) {
        this.cargarDetalle();
      }
    });
  }

  cargarDetalle(): void {
    this.loading = true;
    this.error = '';
    
    this.suspensionService.obtenerDetalleSuspension(this.idSuspension).subscribe({
      next: (suspension) => {
        this.suspension = suspension;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los detalles de la suspensión';
        this.loading = false;
        console.error(error);
      }
    });
  }

  aprobar(): void {
    if (!this.suspension?.puede_modificar) {
      Swal.fire({
        icon: 'warning',
        title: 'Acción no disponible',
        text: 'Esta suspensión ya no se puede modificar.'
      });
      return;
    }

    Swal.fire({
      title: '¿Aprobar suspensión?',
      text: `¿Está seguro de que desea aprobar la suspensión de ${this.suspension?.cliente_info.nombres} ${this.suspension?.cliente_info.apellidos}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, aprobar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.suspensionService.aprobarSuspension(this.idSuspension).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Suspensión aprobada',
              text: response.message
            }).then(() => {
              this.router.navigate(['/admin/suspensiones']);
            });
          },
          error: (error) => {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al aprobar la suspensión'
            });
            console.error(error);
          }
        });
      }
    });
  }

  rechazar(): void {
    if (!this.suspension?.puede_modificar) {
      Swal.fire({
        icon: 'warning',
        title: 'Acción no disponible',
        text: 'Esta suspensión ya no se puede modificar.'
      });
      return;
    }

    Swal.fire({
      title: '¿Rechazar suspensión?',
      text: `¿Está seguro de que desea rechazar la suspensión de ${this.suspension?.cliente_info.nombres} ${this.suspension?.cliente_info.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.suspensionService.rechazarSuspension(this.idSuspension).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Suspensión rechazada',
              text: response.message
            }).then(() => {
              this.router.navigate(['/admin/suspensiones']);
            });
          },
          error: (error) => {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al rechazar la suspensión'
            });
            console.error(error);
          }
        });
      }
    });
  }

  volver(): void {
    this.router.navigate(['/admin/suspensiones']);
  }

  getColorClass(color: string): string {
    const colorMap: { [key: string]: string } = {
      'info': 'badge-info',
      'success': 'badge-success',
      'warning': 'badge-warning',
      'danger': 'badge-danger',
      'secondary': 'badge-secondary'
    };
    return colorMap[color] || 'badge-secondary';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES');
  }

  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString('es-ES');
  }

  descargarArchivo(): void {
    if (this.suspension?.archivo) {
      console.log('Archivo data:', this.suspension.archivo.substring(0, 100));
      console.log('Archivo tipo:', typeof this.suspension.archivo);
      console.log('Archivo length:', this.suspension.archivo.length);
      
      // Verificar si es base64 puro
      if (!this.suspension.archivo.startsWith('http') && !this.suspension.archivo.startsWith('data:')) {
        try {
          // Convertir base64 a blob
          const byteCharacters = atob(this.suspension.archivo);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          
          // Crear URL y descargar
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `suspension_${this.idSuspension}_documento.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          
          console.log('Descarga iniciada como blob');
        } catch (error) {
          console.error('Error convirtiendo base64:', error);
          // Fallback al método original
          const link = document.createElement('a');
          link.href = this.suspension.archivo;
          link.download = 'documento_suspension.pdf';
          link.click();
        }
      } else {
        // Es URL o data URL, usar método original
        const link = document.createElement('a');
        link.href = this.suspension.archivo;
        link.download = 'documento_suspension.pdf';
        link.click();
      }
    }
  }
} 