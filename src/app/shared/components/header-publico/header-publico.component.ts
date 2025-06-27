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
  this.estaLogueado = !!localStorage.getItem('access_token');

  // Escucha cambios de ruta para revalidar sesión
  this.router.events.subscribe(() => {
    this.estaLogueado = !!localStorage.getItem('access_token');
  });
}


  

  cerrarSesion(): void {
    localStorage.clear(); // Limpia todo lo relacionado a la sesión
    this.router.navigate(['/presentacion/inicio']);
  }

}

