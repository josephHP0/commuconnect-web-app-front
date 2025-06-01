import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent {
  constructor(private router: Router) {}

  cerrar() {
    this.router.navigate(['/']);
  }

  irAComunidad() {
    // redirigir a la comunidad
    // por ejemplo, usar router.navigate(['/comunidad'])
    console.log("Redirigir a la comunidad");
  }
}
