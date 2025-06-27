import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/autenticacion/auth.service';


import { ComunidadContexto } from '../../../features/user/services/comunidad.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  estaLogueado = false;

   idComunidad: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.logueado$.subscribe(estado => {
      this.estaLogueado = estado;
    });

    this.authService.verificarToken().subscribe(valid => {
      this.authService.setEstadoLogin(valid);
    });

    const comunidadGuardada = localStorage.getItem('comunidad_seleccionada');
  if (comunidadGuardada) {
    const comunidad = JSON.parse(comunidadGuardada);
    const id = comunidad.id_comunidad;
    this.idComunidad=id;

    console.log(id);
  }
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/presentacion/inicio']);
  }



}
