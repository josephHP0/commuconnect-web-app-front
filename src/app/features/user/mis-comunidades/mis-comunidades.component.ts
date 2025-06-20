import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunidadService, ComunidadContexto } from '../services/comunidad.service';

@Component({
  selector: 'app-mis-comunidades',
  templateUrl: './mis-comunidades.component.html',
  styleUrls: ['./mis-comunidades.component.css']
})
export class MisComunidadesComponent implements OnInit {
  busqueda: string = '';
  comunidades: ComunidadContexto[] = [];
  comunidadesFiltradas: ComunidadContexto[] = [];

  constructor(
    private comunidadService: ComunidadService,
    private router: Router
  ) {}
/*
  ngOnInit(): void {
    this.comunidadService.obtenerComunidades().subscribe({
      next: (data) => {
        this.comunidades = data;
        this.comunidadesFiltradas = [...data];
      },
      error: (error) => {
        console.error('Error al obtener comunidades:', error);
      }
    });
  }
*/
ngOnInit(): void {
  this.comunidadService.obtenerComunidades().subscribe({
    next: (data) => {
      this.comunidades = data.map(comunidad => ({
        ...comunidad,
        imagen: comunidad.imagen
          ? `data:image/png;base64,${comunidad.imagen}`
          : 'assets/imagen-por-defecto.png' // fallback si está vacía
      }));
      this.comunidadesFiltradas = [...this.comunidades];
    },
    error: (error) => {
      console.error('Error al obtener comunidades:', error);
    }
  });
}


  filtrarComunidades(): void {
    const termino = this.busqueda.toLowerCase();
    this.comunidadesFiltradas = this.comunidades.filter(comunidad =>
      comunidad.nombre.toLowerCase().includes(termino)
    );
  }

  irASeleccionComunidad(): void {
    this.router.navigate(['/user/seleccion-comunidad']);
  }

  accederAComunidad(comunidad: ComunidadContexto): void {
    localStorage.setItem('comunidad_seleccionada', JSON.stringify(comunidad));
    localStorage.setItem('id_comunidad', comunidad.id_comunidad.toString()); 
    this.router.navigate(['/user/homepage', comunidad.id_comunidad]);
  }
  cerrarSesion() {
    // Elimina cualquier dato de sesión que hayas almacenado
    localStorage.clear(); // O sessionStorage.clear(), dependiendo de cómo lo manejes
    //localStorage.removeItem('token');

    // Redirige a la página de presentación
    this.router.navigate(['/presentacion/inicio']);
  }
}