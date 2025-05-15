import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-comunidad',
  templateUrl: './seleccion-comunidad.component.html',
  styleUrls: ['./seleccion-comunidad.component.css']
})
export class SeleccionComunidadComponent {
  communities = [
    {
      image: 'assets/mamas-primerizas.png',
        title: 'MAMÁS PRIMERIZAS',
        desc: 'Comparte tu experiencia y crece junto a otras mamás'
    },
    {
      image: 'assets/runners.png',
      title: 'RUNNERS',
      desc: 'Corre, pedalea y comparte tu progreso con otros'
    },
    {
      image: 'assets/gym.png',
      title: 'GYM',
      desc: 'Entrena, progresa y encuentra tu motivación diaria'
    },
    {
      image: 'assets/yoga.png',
      title: 'YOGA',
      desc: 'Conecta cuerpo y mente en armonía con los demás'
    },
    {
      image: 'assets/nutricion.png',
      title: 'NUTRICIÓN',
      desc: 'Aprende y comparte hábitos para una vida saludable'
    }
  ];

  currentIndex = 0;

  constructor(private router: Router) {}

  get currentCommunity() {
    return this.communities[this.currentIndex];
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.communities.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.communities.length) % this.communities.length;
  }

  unirse() {
    localStorage.setItem('comunidadSeleccionada', this.currentCommunity.title);
    this.router.navigate(['/user/dashboard']); // Cambia esta ruta según tu flujo
  }
}