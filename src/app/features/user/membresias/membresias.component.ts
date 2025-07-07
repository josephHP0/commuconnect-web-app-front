import { Component } from '@angular/core';
import { InfoInscripcion, MembresiaUserService } from '../services/membresias/membresia-user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css']
})
export class MembresiasComponent {
  infoInscripcion: InfoInscripcion | null = null;
  esConTopes: boolean | null = null;
  //form
  mostrarFormularioSuspension: boolean = false;
  motivoSuspension: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  archivoAdjunto: File | null = null;
  idComunidadSeleccionada!: number; 

  constructor(private membresiaService: MembresiaUserService,
              private router: Router) {}

  ngOnInit(): void {
    this.idComunidadSeleccionada = Number(localStorage.getItem('id_comunidad'));
    if (isNaN(this.idComunidadSeleccionada)) {
      console.error('❌ No se encontró un id_comunidad válido en localStorage');
      return;
    }

    this.membresiaService.obtenerInfoInscripcion(this.idComunidadSeleccionada).subscribe({
      next: (info) => {
        this.infoInscripcion = info;

        //  Solo si la inscripción está activa
        if (info.estado === 1) {
          this.membresiaService.esPlanConTopes(info.id_inscripcion).subscribe({
            next: (res) => {
              this.esConTopes = res.esPlanConTopes;
            },
            error: (err) => {
              console.error('❌ Error al verificar si el plan tiene topes:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('❌ Error al obtener información de inscripción:', err);
      }
    });
  }


  obtenerEstadoClase(estado?: number): string {
    switch (estado) {
      case 0: return 'congelado';
      case 1: return 'activa';
      case 2: return 'pendiente-plan';
      case 3: return 'pendiente-pago';
      default: return 'desconocido';
    }
  }

  obtenerEstadoTexto(estado?: number): string {
    switch (estado) {
      case 0: return 'Congelado';
      case 1: return 'Activa';
      case 2: return 'Pendiente de plan';
      case 3: return 'Pendiente de pago';
      default: return 'Desconocido';
    }
  }


  esProximoAVencer(fechaFinIso?: string | null): boolean {
  if (!fechaFinIso) return false;

  const fechaFin = new Date(fechaFinIso);
  const hoy = new Date();

  const diffMs = fechaFin.getTime() - hoy.getTime();
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  return diffDias <= 7 && diffDias >= 0;
}



  solicitarSuspension(): void {
    // Guarda el id_inscripcion en localStorage (si no lo habías hecho aún)
    if (this.infoInscripcion) {
      localStorage.setItem('id_inscripcion', this.infoInscripcion.id_inscripcion.toString());
    }

    // Navega a la nueva pantalla
    this.router.navigate(['/user/suspension-membresia']);

  }



  pagarMembresia(): void {
    const idComunidad = this.idComunidadSeleccionada;

    if (this.infoInscripcion?.estado !== 3) {
      Swal.fire('Atención', 'Solo puedes reactivar si la membresía está pendiente de pago.', 'info');
      return;
    }

    const idInscripcion = this.infoInscripcion.id_inscripcion;

    this.membresiaService.reactivarMembresia(idInscripcion).subscribe({
      next: (res) => {
        Swal.fire('Listo', 'Membresía reactivada exitosamente', 'success');
        this.infoInscripcion!.estado = 1; // actualizar localmente
      },
      error: (err) => {
        console.error('❌ Error al reactivar:', err);
        Swal.fire('Error', err.error?.detail || 'No se pudo reactivar la membresía.', 'error');
      }
    });
  }










  // membresias.component.ts
  cancelarMembresia(): void {
    if (!this.infoInscripcion) {
      Swal.fire('Error', 'No hay información de inscripción para cancelar.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      //text: 'Tu membresía será cancelada y quedará pendiente de pago.',
      text: 'Al cancelar perderás acceso a todos los beneficios, contenidos exclusivos y funcionalidades premium. Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Volver'
    }).then((result) => {
      if (result.isConfirmed) {
        this.membresiaService.cancelarMembresia(this.infoInscripcion!.id_inscripcion).subscribe({
          next: () => {
            Swal.fire('Cancelado', 'Tu membresía está ahora pendiente de pago.', 'success');
            this.ngOnInit();
          },
          error: (err) => {
            Swal.fire('Error', 'Ocurrió un error al cancelar la membresía.', 'error');
          }
        });
      }
    });
  }


verHistorialPagos(): void {
  this.router.navigate(['/user/historial-pagos']);
}


congelarMembresia(): void {
  if (!this.infoInscripcion) {
    Swal.fire('Error', 'No hay información de inscripción para congelar.', 'error');
    return;
  }

  // Validar fechas
  if (!this.fechaInicio || !this.fechaFin) {
    Swal.fire('Error', 'Las fechas de inicio y fin son requeridas.', 'error');
    return;
  }

  // Lógica para congelar membresía
  const idInscripcion = this.infoInscripcion.id_inscripcion;

  this.membresiaService.congelarMembresiaConFormulario(
    idInscripcion,
    this.motivoSuspension,
    this.fechaInicio,
    this.fechaFin,
    this.archivoAdjunto
  ).subscribe({
    next: (res) => {
      Swal.fire('Éxito', 'La membresía ha sido congelada.', 'success');
      this.infoInscripcion!.estado = 0; // Actualizar estado a congelado
      this.mostrarFormularioSuspension = false; // Ocultar formulario
    },
    error: (err) => {
      console.error('❌ Error al congelar membresía:', err);
      Swal.fire('Error', 'Ocurrió un error al congelar la membresía.', 'error');
    }
  });
}

}
