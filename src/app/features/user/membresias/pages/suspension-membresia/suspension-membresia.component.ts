import { Component } from '@angular/core';
import { MembresiaUserService } from '../../../services/membresias/membresia-user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-suspension-membresia',
  templateUrl: './suspension-membresia.component.html',
  styleUrls: ['./suspension-membresia.component.css']
})
export class SuspensionMembresiaComponent {
  motivo: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  archivoAdjunto: File | null = null;

  constructor(
    private membresiaService: MembresiaUserService,
    private router: Router
  ) {}

  onArchivoSeleccionado(event: any): void {
    const archivo = event.target.files[0];
    if (archivo && archivo.size <= 4 * 1024 * 1024) {
      this.archivoAdjunto = archivo;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Archivo no válido',
        text: 'El archivo supera los 4MB o no es válido.',
      });
      this.archivoAdjunto = null;
    }
  }

  confirmarSuspension(): void {
    Swal.fire({
      title: '¿Deseas enviar la solicitud de suspensión?',
      text: 'Una vez enviada, será evaluada por el equipo.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (!result.isConfirmed) return;

      const idInscripcion = Number(localStorage.getItem('id_inscripcion'));

      if (!idInscripcion) {
        Swal.fire({
          icon: 'error',
          title: 'ID no encontrado',
          text: 'No se encontró el ID de inscripción.',
        });
        return;
      }

      const formData = new FormData();
      formData.append('motivo', this.motivo);
      formData.append('fecha_inicio', this.fechaInicio);
      formData.append('fecha_fin', this.fechaFin);
      if (this.archivoAdjunto) {
        formData.append('archivo', this.archivoAdjunto);
      }

      this.membresiaService.congelarMembresiaConFormulario(idInscripcion, formData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'La solicitud ha sido enviada con éxito.',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/user/membresias']); // Redirección corregida
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error al enviar',
            text: 'Ocurrió un error al enviar la solicitud.',
          });
        }
      });
    });
  }
}
