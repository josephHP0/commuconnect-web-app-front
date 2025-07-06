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


  esMembresiaActiva(estado: number | undefined): string {
    if (estado === 1) {
      return 'Activo';
    }
    return 'Inactivo';
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

    if (this.infoInscripcion?.estado === 3 && idComunidad) {
      this.membresiaService.pagarMembresia(idComunidad).subscribe({
        next: (res) => {
          Swal.fire('✅ Membresía activada', 'Tu membresía ha sido reactivada con éxito.', 'success');
          this.ngOnInit(); // para refrescar el estado en pantalla
        },
        error: (err) => {
          console.error('❌ Error al pagar membresía:', err);
          Swal.fire('Error', err?.error?.detail || 'Ocurrió un error al activar la membresía.', 'error');
        }
      });
    } else {
      Swal.fire('Atención', 'Solo puedes pagar si la membresía está pendiente de pago.', 'info');
    }
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


}
