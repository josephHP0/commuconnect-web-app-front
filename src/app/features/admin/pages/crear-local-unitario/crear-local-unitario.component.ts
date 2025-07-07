import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrearLocalUnitarioService, LocalCreate } from '../../services/crear-local-unitario.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-local-unitario',
  templateUrl: './crear-local-unitario.component.html',
  styleUrls: ['./crear-local-unitario.component.css']
})
export class CrearLocalUnitarioComponent {
  local: any = {
    ubicacion: '',
    direccion: '',
    responsable_nombre: '',
    responsable_apellido: '',
    responsable_email: ''
  };

  constructor(
    private localService: CrearLocalUnitarioService,
    private router: Router, // Inyectamos el Router para manejar la navegación
    private location: Location // Inyectamos Location para manejar la acción de "Volver"
  ) {}

  registrarLocal(): void {
    // Obtenemos el id_servicio desde el localStorage o lo asignamos como 0 si no existe
    const id_servicio = parseInt(localStorage.getItem('id_servicio') || '0', 10);

    // Creamos el objeto local que vamos a enviar al backend
    const localParaEnviar: LocalCreate = {
      id_departamento: 1, // Asigna el valor real del departamento
      id_distrito: 1,     // Asigna el valor real del distrito
      id_servicio: id_servicio || null, // Usamos el id_servicio que obtenemos del localStorage
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
    // Al presionar el botón de volver, regresamos a la página anterior
    this.location.back();
  }
}
