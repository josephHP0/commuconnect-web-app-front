import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-publico',
  templateUrl: './header-publico.component.html',
  styleUrls: ['./header-publico.component.css']
})
export class HeaderPublicoComponent {

  constructor(private router: Router) {}

  get estaLogueado(): boolean {
    return !!localStorage.getItem('access_token');
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/presentacion/inicio']);
  }
}

