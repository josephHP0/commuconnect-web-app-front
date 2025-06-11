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
}
