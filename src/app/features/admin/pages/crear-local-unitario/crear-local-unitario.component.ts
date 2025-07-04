import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrearLocalUnitarioService, LocalCreate } from '../../services/crear-local-unitario.service';

@Component({
  selector: 'app-crear-local-unitario',
  templateUrl: './crear-local-unitario.component.html',
  styleUrls: ['./crear-local-unitario.component.css']
})
export class CrearLocalUnitarioComponent {
  local: LocalCreate = {
    ubicacion: '',
    direccion: '',
    responsable_nombre: '',
    responsable_apellido: '',
    responsable_email: '',
    id_servicio: null
  };

  constructor(
    private localService: CrearLocalUnitarioService,
    private router: Router
  ) {}

  registrarLocal(): void {
    this.localService.registrarLocal(this.local).subscribe({
      next: () => {
        alert('Local creado con éxito');
        this.router.navigate(['/locales']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear el local');
      }
    });
  }

  volver(): void {
    this.router.navigate(['/locales']);
  }
}
