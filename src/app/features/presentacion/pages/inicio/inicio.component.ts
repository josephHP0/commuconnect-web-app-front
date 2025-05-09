import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  apiUrl = environment.apiUrl;

  constructor() {
    console.log('API URL cargada:', this.apiUrl);
  }

}
