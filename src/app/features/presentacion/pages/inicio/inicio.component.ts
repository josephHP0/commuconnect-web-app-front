import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  apiUrl = environment.apiUrl;

  constructor(private readonly router: Router) {
    //console.log('API URL cargada:', this.apiUrl);
  }

  navegarALogin() {
   this.router.navigate(['/autenticacion']);
}

}
