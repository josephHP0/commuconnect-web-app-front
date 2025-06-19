import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.css']
})
export class ComunidadesComponent implements OnInit {
  estaLogueado: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Revisa si hay token al cargar el componente
    this.estaLogueado = !!localStorage.getItem('access_token');
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/presentacion/inicio']);
  }
}
