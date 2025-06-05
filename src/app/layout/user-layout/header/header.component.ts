import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

   constructor(private router: Router) {}

   cerrarSesion() {
    localStorage.removeItem('token');

    // Verificar si realmente borró
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token eliminado correctamente, sesión cerrada.');
    } else {
      console.warn('Error: Token todavía existe en localStorage.');
    }

    this.router.navigate(['/login']);
  }

}
