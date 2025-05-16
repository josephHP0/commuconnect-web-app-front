import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-comunidad',
  templateUrl: './seleccion-comunidad.component.html',
  styleUrls: ['./seleccion-comunidad.component.css']
})
export class SeleccionComunidadComponent implements OnInit {
  busqueda: string = '';
  currentIndex = 0;

  communities: any[] = [];
  comunidadesFiltradas: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    //this.http.get<any[]>('http://localhost:8000/listar_comunidad').subscribe({
    this.http.get<any[]>('http://44.194.107.188:8000/api/comunidades/listar_comunidad').subscribe({

      next: data => {
        this.communities = data.map(c => ({
          image: 'data:image/png;base64,' + c.imagen,
          title: c.nombre,
          desc: c.slogan ?? 'Sin descripción'
        }));
        this.comunidadesFiltradas = [...this.communities];
      },
      error: err => {
        console.error('Error al cargar comunidades:', err);
      }
    });
  }

  get currentCommunity() {
    return this.comunidadesFiltradas[this.currentIndex] || { title: '', desc: '', image: '' };
  }

  nextSlide() {
    if (this.comunidadesFiltradas.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.comunidadesFiltradas.length;
  }

  prevSlide() {
    if (this.comunidadesFiltradas.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.comunidadesFiltradas.length) % this.comunidadesFiltradas.length;
  }

  unirse() {
    localStorage.setItem('comunidadSeleccionada', this.currentCommunity.title);
    this.router.navigate(['/user/dashboard']);
  }

  filtrarComunidades() {
    const query = this.busqueda.trim().toLowerCase();
    this.comunidadesFiltradas = this.communities.filter(c =>
      c.title.toLowerCase().includes(query)
    );
    this.currentIndex = 0;
  }
}
