import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/autenticacion/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  estaLogueado = false;

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
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/presentacion/inicio']);
  }
}
