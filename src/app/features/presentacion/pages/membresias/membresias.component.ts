import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css']
})
export class MembresiasComponent {
  constructor(private readonly router: Router) {}

  // Getter dinámico para verificar si el usuario está logueado
  get estaLogueado(): boolean {
    return !!localStorage.getItem('access_token');
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/presentacion/inicio']);
  }
}
