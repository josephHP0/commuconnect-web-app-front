import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comunidad,ComunidadService } from '../services/comunidad.service';
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

  unirse(): void {
    if (!this.currentCommunity) return;
    
    this.comunidadService.unirseAComunidad(this.currentCommunity.id_comunidad).subscribe({
    next: () => {
      alert(`Te uniste a la comunidad: ${this.currentCommunity?.nombre}`);
      this.router.navigate(['/pago/plan']);
    },
    error: () => alert('Error al intentar unirte a la comunidad')
  });
  }


}

