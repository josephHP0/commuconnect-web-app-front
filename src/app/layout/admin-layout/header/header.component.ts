import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/autenticacion/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  estaLogueado = false;

    constructor(private router: Router, private authService: AuthService) {}


 ngOnInit(): void {
    this.authService.logueado$.subscribe(estado => {
      this.estaLogueado = estado;
    });

    this.authService.verificarToken().subscribe(valid => {
      this.authService.setEstadoLogin(valid);
    });
 }
/*
   cerrarSesion() {
    localStorage.removeItem('token');

    // Verificar si realmente borró
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token eliminado correctamente, sesión cerrada.');
    } else {
      console.warn('Error: Token todavía existe en localStorage.');
    }

    this.router.navigate(['/presentacion/inicio']);
  }
*/
  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/presentacion/inicio']);
  }


  

}
