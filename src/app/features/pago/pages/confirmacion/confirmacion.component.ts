import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent {
  constructor(private router: Router,
      private route: ActivatedRoute
  ) {}

  cerrar() {
    this.router.navigate(['/']);
  }

  irAComunidad() {
    // redirigir a la comunidad
    console.log("Redirigir a la comunidad");
  }
}
