import { Component } from '@angular/core';
import { InfoInscripcion, MembresiaUserService } from '../services/membresias/membresia-user.service';

@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css']
})
export class MembresiasComponent {
  infoInscripcion: InfoInscripcion | null = null;
  esConTopes: boolean | null = null;

  constructor(private membresiaService: MembresiaUserService) {}

  ngOnInit(): void {
    const idComunidad = Number(localStorage.getItem('id_comunidad'));
    if (isNaN(idComunidad)) {
      console.error('❌ No se encontró un id_comunidad válido en localStorage');
      return;
    }

    this.membresiaService.obtenerInfoInscripcion(idComunidad).subscribe({
      next: (info) => {
        this.infoInscripcion = info;

        this.membresiaService.esPlanConTopes(info.id_inscripcion).subscribe({
          next: (res) => {
            this.esConTopes = res.esPlanConTopes;
          },
          error: (err) => {
            console.error('❌ Error al verificar si el plan tiene topes:', err);
          }
        });
      },
      error: (err) => {
        console.error('❌ Error al obtener información de inscripción:', err);
      }
    });
  }
  solicitarSuspension(): void {
    const idInscripcion = this.infoInscripcion?.id_inscripcion;

    if (!idInscripcion) {
      console.error('❌ ID de inscripción no disponible.');
      return;
    }

    this.membresiaService.congelarMembresia(idInscripcion).subscribe({
      next: (res) => {
        console.log('✅ Suspensión de membresía realizada:', res);
        alert('La membresía ha sido suspendida exitosamente.');
        this.ngOnInit(); // Recarga la información actualizada
      },
      error: (err) => {
        console.error('❌ Error al suspender la membresía:', err);
        alert('Ocurrió un error al suspender la membresía.');
      }
    });
  }
  pagarMembresia(): void {
    const idInscripcion = this.infoInscripcion?.id_inscripcion;

    if (!idInscripcion) {
      console.error('❌ ID de inscripción no disponible.');
      return;
    }

    this.membresiaService.reactivarMembresia(idInscripcion).subscribe({
      next: (res) => {
        console.log('✅ Membresía reactivada:', res);
        alert('La membresía ha sido reactivada exitosamente.');
        this.ngOnInit(); // Para recargar el estado actualizado
      },
      error: (err) => {
        console.error('❌ Error al reactivar la membresía:', err);
        alert(err.error?.detail || 'Error al reactivar la membresía.');
      }
    });
  }
  // membresias.component.ts
  cancelarMembresia(): void {
    if (!this.infoInscripcion) {
      console.error('❌ No hay información de inscripción para cancelar.');
      return;
    }

    this.membresiaService.cancelarMembresia(this.infoInscripcion.id_inscripcion).subscribe({
      next: (res) => {
        console.log('✅ Membresía cancelada:', res.message);
        alert('Membresía cancelada correctamente. Ahora está pendiente de pago.');
        // Opcional: recargar los datos
        this.ngOnInit();
      },
      error: (err) => {
        console.error('❌ Error al cancelar membresía:', err);
        alert('Ocurrió un error al cancelar la membresía.');
      }
    });
  }



}
