import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



export interface Comunidad {
  nombre: string;
  slogan?: string;
  descripcion: string;
  // No incluimos el archivo aquí porque se enviará en FormData
}



@Injectable({
  providedIn: 'root'
})


export class ComunidadService {


   private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }




crearComunidad(comunidad: Comunidad, logo?: File): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', comunidad.nombre);
    if (comunidad.slogan) {
      formData.append('slogan', comunidad.slogan);
    }
    formData.append('descripcion', comunidad.descripcion);

    if (logo) {
      formData.append('logo', logo, logo.name);
    }

    return this.http.post(`${this.baseUrl}/auth/comunidades`, formData);

//return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, body);


  }




}
