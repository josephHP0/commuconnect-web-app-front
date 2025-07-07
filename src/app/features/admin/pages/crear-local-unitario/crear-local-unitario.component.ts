import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrearLocalUnitarioService, LocalCreate } from '../../services/crear-local-unitario.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-local-unitario',
  templateUrl: './crear-local-unitario.component.html',
  styleUrls: ['./crear-local-unitario.component.css']
})
export class CrearLocalUnitarioComponent implements OnInit {
  local: any = {
    ubicacion: '',
    direccion: '',
    responsable_nombre: '',
    responsable_apellido: '',
    responsable_email: ''
  };

  id_servicio: number | null = null;
  nombreServicio: string = '';

  constructor(
    private localService: CrearLocalUnitarioService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const state = history.state;

    if (state?.['id_servicio'] && !isNaN(state['id_servicio'])) {
      this.id_servicio = parseInt(state['id_servicio'], 10);
      this.nombreServicio = state['nombreServicio'] || '';
      console.log('ID de servicio recuperado correctamente:', this.id_servicio);
    } else {
      Swal.fire('Error', 'ID de servicio no definido o inválido', 'error');
      this.location.back(); // vuelve automáticamente
    }
  }

  registrarLocal(): void {
    if (!this.id_servicio) {
      Swal.fire('Error', 'No se puede registrar local sin ID de servicio', 'error');
      return;
    }

    const localParaEnviar: LocalCreate = {
      id_departamento: 1, // reemplazar con valor real
      id_distrito: 1,     // reemplazar con valor real
      id_servicio: this.id_servicio,
      direccion_detallada: this.local.direccion,
      responsable: `${this.local.responsable_nombre} ${this.local.responsable_apellido}`,
      nombre: this.local.ubicacion,
      link: this.local.responsable_email
    };

    // Llamamos al servicio para registrar el local
    this.localService.registrarLocal(localParaEnviar).subscribe({
      next: () => {
        // Si la creación fue exitosa, mostramos un mensaje de éxito y redirigimos
        Swal.fire('Éxito', 'Local registrado correctamente', 'success').then(() => {
          // Redirigimos a la página de "Servicios por Comunidad" con el id_servicio
          this.router.navigate(['admin/gestion-servicios']);
        });
      },
      error: (err) => {
        // En caso de error, mostramos un mensaje de error
        console.error('Error al registrar local:', err);
        Swal.fire('Error', 'No se pudo registrar el local', 'error');
      }
    });
  }

  volver(): void {
    this.location.back();
  }
}
