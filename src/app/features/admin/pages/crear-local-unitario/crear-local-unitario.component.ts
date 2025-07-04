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
    private router: Router,private location: Location
  ) {}

  registrarLocal(): void {
  const id_servicio = parseInt(localStorage.getItem('id_servicio') || '0', 10);

  const localParaEnviar: LocalCreate = {
    id_departamento: 1, // reemplaza con valor real
    id_distrito: 1,     // reemplaza con valor real
    id_servicio: id_servicio || null,
    direccion_detallada: this.local.direccion,
    responsable: `${this.local.responsable_nombre} ${this.local.responsable_apellido}`,
    nombre: this.local.ubicacion,
    link: this.local.responsable_email
  };

  this.localService.registrarLocal(localParaEnviar).subscribe({
    next: () => {
      Swal.fire('Éxito', 'Local registrado correctamente', 'success').then(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/locales', id_servicio], {
            state: { nombreServicio: 'Servicio' } // reemplaz el nombre real
          });
        });
      });

    },
    error: (err) => {
      console.error('Error al registrar local:', err);
      Swal.fire('Error', 'No se pudo registrar el local', 'error');
    }
  });
}

  volver(): void {
    this.location.back(); 
  }
}
