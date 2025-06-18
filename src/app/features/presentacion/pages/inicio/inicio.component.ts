import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  apiUrl = environment.apiUrl;

  constructor(private readonly router: Router) {}

  // Getter dinámico para verificar si el usuario está logueado
  get estaLogueado(): boolean {
    return !!localStorage.getItem('access_token');
  }

  ngOnInit(): void {
    // Ya no necesitas nada acá para "estaLogueado", porque ahora es dinámico
  }

  navegarALogin() {
    this.router.navigate(['/autenticacion']);
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/presentacion/inicio']);
  }
}
