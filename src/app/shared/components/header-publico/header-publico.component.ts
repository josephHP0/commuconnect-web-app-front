import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/autenticacion/auth.service';

@Component({
  selector: 'app-header-publico',
  templateUrl: './header-publico.component.html',
  styleUrls: ['./header-publico.component.css']
})
export class HeaderPublicoComponent implements OnInit{

  estaLogueado = false;

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.authService.logueado$.subscribe(estado => {
      this.estaLogueado = estado;
    });

    this.authService.verificarToken().subscribe(valid => {
      this.authService.setEstadoLogin(valid);
    });
  }

  

  cerrarSesion(): void {
    this.authService.logout(); // ← Notifica que ya no está logueado
    this.router.navigate(['/presentacion/inicio']);
  }
}

