import { Component, OnInit } from '@angular/core';
import { ComunidadService, ComunidadContexto } from '../services/comunidad.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  comunidad: ComunidadContexto | null = null;

  constructor(private comunidadService: ComunidadService) {}

  ngOnInit(): void {
    const comunidadGuardada = localStorage.getItem('comunidad_seleccionada');
    if (comunidadGuardada) {
      const comunidad = JSON.parse(comunidadGuardada);
      const id = comunidad.id_comunidad;

      this.comunidadService.obtenerComunidadPorId(id).subscribe({
        next: (data) => this.comunidad = data,
        error: (err) => console.error('Error al cargar comunidad:', err)
      });
    }
  }
}
