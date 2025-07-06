import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comunidad,ComunidadService } from '../services/comunidad.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-seleccion-comunidad',
  templateUrl: './seleccion-comunidad.component.html',
  styleUrls: ['./seleccion-comunidad.component.css']
})
export class SeleccionComunidadComponent implements OnInit {

  comunidades: Comunidad[] = [];
  comunidadesFiltradas: Comunidad[] = [];
  currentIndex: number = 0;
  currentCommunity: Comunidad | null = null;
  busqueda: string = '';
  errorMessage: string = '';
  mensajeConfirmacion: string | null = null;

  constructor(
    private comunidadService: ComunidadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.comunidadService.getComunidades().subscribe({
      next: (data) => {
        // Mapear para asegurarse que imagen sea string o '' si es null
        this.comunidades = data.map(c => ({
          ...c,
          imagen: c.imagen ?? ''   // asigna string vacío si es null
        }));
        this.comunidadesFiltradas = [...this.comunidades];
        this.setCurrentCommunity();
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar comunidades';
      }
    });
  }

  filtrarComunidades(): void {
    const texto = this.busqueda.toLowerCase().trim();
    if (texto) {
      this.comunidadesFiltradas = this.comunidades.filter(c =>
        c.nombre.toLowerCase().includes(texto) ||
        c.slogan.toLowerCase().includes(texto)
      );
    } else {
      this.comunidadesFiltradas = [...this.comunidades];
    }
    this.currentIndex = 0;
    this.setCurrentCommunity();
  }

  setCurrentCommunity(): void {
    if (this.comunidadesFiltradas.length > 0) {
      this.currentCommunity = this.comunidadesFiltradas[this.currentIndex];
    } else {
      this.currentCommunity = null;
    }
  }

  prevSlide(): void {
    if (this.comunidadesFiltradas.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.comunidadesFiltradas.length) % this.comunidadesFiltradas.length;
    this.setCurrentCommunity();
  }

  nextSlide(): void {
    if (this.comunidadesFiltradas.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.comunidadesFiltradas.length;
    this.setCurrentCommunity();
  }

  /*unirse(): void {
    if (!this.currentCommunity) return;

    this.comunidadService.unirseAComunidad(this.currentCommunity.id_comunidad).subscribe({
    next: () => {
      alert(`Te uniste a la comunidad: ${this.currentCommunity?.nombre}`);
      this.router.navigate(['/pago/plan']);
    },
    error: () => alert('Error al intentar unirte a la comunidad')
  });
  }*/
  //agrego para registrar la inscripción


  //esto es con queryparams
/*unirse(): void {
  if (!this.currentCommunity) return;

  this.comunidadService.unirseAComunidad(this.currentCommunity.id_comunidad).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: '¡Te uniste con éxito!',
        text: `Ahora formas parte de: ${this.currentCommunity?.nombre}`,
        confirmButtonText: 'Continuar'
      }).then(() => {
        this.router.navigate(['/pago/plan'], {
          queryParams: { id_comunidad: this.currentCommunity?.id_comunidad }
        });
      });
    },
    error: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo unir a la comunidad. Intenta nuevamente.',
        confirmButtonText: 'Cerrar'
      });
    }
  });*/
  unirse(): void {
    if (!this.currentCommunity) return;

    const comunidad = this.currentCommunity; // Alias con tipo no nulo

    this.comunidadService.unirseAComunidad(comunidad.id_comunidad).subscribe({
      next: () => {
        // Solo setear si no existe aún
        if (!localStorage.getItem('id_comunidad')) {
          localStorage.setItem('id_comunidad', comunidad.id_comunidad.toString());
        }

        Swal.fire({
          icon: 'success',
          title: '¡Te uniste con éxito!',
          text: `Ahora formas parte de: ${comunidad.nombre}`,
          confirmButtonText: 'Continuar'
        }).then(() => {
          this.router.navigate(['/pago/plan']);
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo unir a la comunidad. Intenta nuevamente.',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
  cerrarSesion() {
    // Elimina cualquier dato de sesión que hayas almacenado
    localStorage.clear(); // O sessionStorage.clear(), dependiendo de cómo lo manejes
    //localStorage.removeItem('token');

    // Redirige a la página de presentación
    this.router.navigate(['/presentacion/inicio']);
  }
  getTransform(i: number): string {
    const total = this.comunidadesFiltradas.length;
    const offset = i - this.currentIndex;

    // Para que rote circularmente
    const relativeIndex = (offset + total) % total;

    // Máximo 5 elementos visibles (2 a cada lado del centro)
    const maxVisible = 2;
    const distance = relativeIndex > total / 2 ? relativeIndex - total : relativeIndex;

    if (Math.abs(distance) > maxVisible) {
      return 'scale(0) translateX(0)';
    }

    const scale = 1 - Math.abs(distance) * 0.2;
    const translateX = distance * 200;

    return `translateX(${translateX}px) scale(${scale})`;
  }

}






