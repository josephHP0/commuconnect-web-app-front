import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../services/servicio.service';
import { ComunidadService, ComunidadContexto } from '../services/comunidad.service';


interface Servicio {
  id_servicio: number;
  nombre: string;
  descripcion: string;
  modalidad: 'Presencial' | 'Virtual';
  imagen?: string;
}

@Component({
  selector: 'app-seleccionar-servicio',
  templateUrl: './seleccionar-servicio.component.html',
  styleUrls: ['./seleccionar-servicio.component.css']
})

export class SeleccionarServicioComponent implements OnInit {

  


  servicios: Servicio[] = [];
  idComunidad: number = 3;
  topes: number = 0;

  tieneTopes: boolean = false;
  topesDisponibles: number = 0;

  constructor(
    private servicioService: ServicioService,
    private comunidadService: ComunidadService,
    private router: Router
  ) {}

  ngOnInit() {
   




    const comunidadGuardada = localStorage.getItem('comunidad_seleccionada');
    if (comunidadGuardada) {
      const comunidad = JSON.parse(comunidadGuardada);
      const id = comunidad.id_comunidad;


      this.idComunidad = id;

      this.obtenerServicios();
      //this.obtenerTopes();




      this.comunidadService.verificarSiTieneTopes(id).subscribe((respuesta: any) => {
       
        this.tieneTopes = respuesta.tieneTopes;
        console.log("Tiene topes verificacion", this.tieneTopes )
  
        if (this.tieneTopes) {
          // Si tiene topes, obtener cantidad
          this.comunidadService.obtenerCantidadTopes(id).subscribe((data: any) => {
            this.topesDisponibles = data.topes_disponibles-data.topes_consumidos;
          });
        }else{
          console.log("No tiene topes")
        }
      });


    }





  }
/*
  obtenerServicios() {
    this.servicioService.obtenerServiciosPorComunidad(this.idComunidad)
      .subscribe({
        next: (data) => this.servicios = data,
        error: (err) => console.error('Error al cargar servicios', err)
      });
  }
*/
/*
obtenerServicios() {
  this.servicioService.obtenerServiciosPorComunidad(this.idComunidad)
    .subscribe({
      next: (data: { servicios: Servicio[] }) => {
  this.servicios = (data.servicios || []).map((servicio: Servicio) => {
    console.log('Imagen del servicio', servicio.nombre, servicio.imagen);
    if (servicio.imagen && !servicio.imagen.startsWith('data:image')) {
      servicio.imagen = `data:image/jpeg;base64,${servicio.imagen}`;
    }
    return servicio;
  });
},
      error: (err) => console.error('Error al cargar servicios', err)
    });
}
*/
/*
obtenerServicios() {
  this.servicioService.obtenerServiciosPorComunidad(this.idComunidad)
    .subscribe({
      next: (data: { servicios: Servicio[] }) => {
      this.servicios = (data.servicios || []).map((servicio: Servicio) => {
 if (servicio.imagen && !servicio.imagen.startsWith('data:image')) {
  const trimmed = servicio.imagen.trim();

  // Detectar mime type por los primeros caracteres base64
  let mime = 'image/jpeg';
  if (trimmed.startsWith('iVBOR')) {
    mime = 'image/png';
  }

  servicio.imagen = `data:${mime};base64,${trimmed}`;
}
  return servicio;
});
      },
      error: (err) => console.error('Error al cargar servicios', err)
    });
}
*/
/*
obtenerServicios() {
  this.servicioService.obtenerServiciosPorComunidad(this.idComunidad)
    .subscribe({
      next: (data: { servicios: Servicio[] }) => {
        this.servicios = (data.servicios || []).map((servicio: Servicio) => {
          if (servicio.imagen && !servicio.imagen.startsWith('data:image')) {
            const base64 = servicio.imagen.trim();
            console.log('IMAGEN:', servicio.nombre, servicio.imagen);

            // Detección de tipo MIME
            let mime = 'image/jpeg'; // valor por defecto
            if (base64.startsWith('iVBOR')) {
              mime = 'image/png';
            } else if (base64.startsWith('/9j/')) {
              mime = 'image/jpeg';
            } else if (base64.startsWith('R0lGOD')) {
              mime = 'image/gif';
            }

            servicio.imagen = `data:${mime};base64,${base64}`;
          }

          return servicio;
        });
      },
      error: (err) => console.error('Error al cargar servicios', err)
    });
}
*/
/*
obtenerServicios() {
  this.servicioService.obtenerServiciosPorComunidad(this.idComunidad)
    .subscribe({
      next: (data: { servicios: Servicio[] }) => {
        this.servicios = (data.servicios || []).map((servicio: Servicio) => {
          if (servicio.imagen && !servicio.imagen.startsWith('data:image')) {
            const base64 = servicio.imagen.trim();
             console.log('IMAGEN:', servicio.nombre, servicio.imagen);
            
            // Detectar el tipo MIME usando prefijo base64
            let mime = 'image/jpeg';
            if (base64.startsWith('iVBOR')) mime = 'image/png';
            else if (base64.startsWith('/9j/')) mime = 'image/jpeg';
            else if (base64.startsWith('R0lGOD')) mime = 'image/gif';

            servicio.imagen = `data:${mime};base64,${base64}`;
          }
          return servicio;
        });
      },
      error: (err) => console.error('Error al cargar servicios', err)
    });
}
*/
obtenerServicios() {
  this.servicioService.obtenerServiciosPorComunidad(this.idComunidad)
    .subscribe({
      next: (data: { servicios: Servicio[] }) => {
        this.servicios = (data.servicios || []).map((servicio: Servicio) => {
          if (
            servicio.imagen &&
            typeof servicio.imagen === 'string' &&
            servicio.imagen.trim() !== '' &&
            !servicio.imagen.startsWith('data:image')
          ) {
            const base64 = servicio.imagen.trim();
            // Detectar el tipo MIME por prefijo base64
            let mime = 'image/jpeg';
            if (base64.startsWith('iVBOR')) mime = 'image/png';
            else if (base64.startsWith('/9j/')) mime = 'image/jpeg';
            else if (base64.startsWith('R0lGOD')) mime = 'image/gif';
            else mime = 'image/jpeg'; // Por defecto

            // Validar longitud mínima para evitar imágenes corruptas
            if (base64.length > 50) {
              servicio.imagen = `data:${mime};base64,${base64}`;
            } else {
              servicio.imagen = undefined;
            }
          } else if (!servicio.imagen || servicio.imagen.trim() === '') {
            servicio.imagen = undefined;
          }
          return servicio;
        });
      },
      error: (err) => console.error('Error al cargar servicios', err)
    });
}







  obtenerTopes() {
    this.servicioService.obtenerTopesPorComunidad(this.idComunidad)
      .subscribe({
        next: (res) => this.topes = res.tope || 0,
        error: (err) => console.error('Error al cargar topes', err)
      });
  }
/*
  seleccionarServicio(servicioId: number) {
    this.router.navigate(['/user/sesiones'], {
      queryParams: { servicioId }
    });
  }
*/

  seleccionarServicio(servicio: Servicio) {
  if (servicio.modalidad === 'Presencial') {
    // Si es presencial, redirige a sesiones presenciales
    console.log('Redirigir presenciales');

    this.router.navigate(['/user/sesiones'], {
      queryParams: { servicioId: servicio.id_servicio }
    });
  } else if (servicio.modalidad === 'Virtual') {
    // Por ahora solo muestra mensaje, puedes cambiar la ruta cuando esté lista
    console.log('Redirigir a sesiones virtuales (pendiente implementar)');
     this.router.navigate(['/user/reservas-virtuales'], {
       queryParams: { servicioId: servicio.id_servicio }
     });
  } else {
    console.warn('Tipo de servicio no reconocido:', servicio.modalidad);
  }
}


}
