import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { ComunidadService } from '../../services/comunidad.service';

@Component({
  selector: 'app-registro-comunidad',
  templateUrl: './registro-comunidad.component.html',
  styleUrls: ['./registro-comunidad.component.css']
})
export class RegistroComunidadComponent {




comunidad = {
    nombre: '',
    slogan: '',
    descripcion: ''
  };

  imagenURL: string | ArrayBuffer | null = null;
  archivoLogo: File | null = null;

  constructor(
    private readonly comunidadService: ComunidadService,
    private readonly router: Router
  ) {}




  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      this.archivoLogo = file;

      const reader = new FileReader();
      reader.onload = e => {
        this.imagenURL = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  borrarLogo(): void {
    this.archivoLogo = null;
    this.imagenURL = null;
  }


 crearComunidad(): void {
  /*
    if (!this.comunidad.nombre || !this.comunidad.descripcion) {
      alert('Por favor, completa los campos requeridos');
      return;
    }

    this.comunidadService.crearComunidad(this.comunidad, this.archivoLogo).subscribe({
      next: (res) => {
        console.log('Comunidad creada', res);
        this.router.navigate(['/comunidades']);
      },
      error: (err) => {
        console.error('Error al crear comunidad', err);
      }
    });

    */
  }





}
