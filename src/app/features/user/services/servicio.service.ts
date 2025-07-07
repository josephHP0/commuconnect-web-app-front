import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
export interface Servicio {
  id_servicio: number;
  nombre: string;
  descripcion: string;
  modalidad: string;
  imagen_base64?: string;
  imagen?: string; // será generado desde imagen_base64
  [key: string]: any; // por si vienen más campos
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private readonly baseUrl = environment.apiUrl;
 // O usa environment.apiUrl si tienes proxy

  constructor(private http: HttpClient) {}

  /*
  obtenerServiciosPorComunidad(idComunidad: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuarios/usuario/comunidad/${idComunidad}`);
  }

  obtenerTopesPorComunidad(idComunidad: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/usuarios/usuario/comunidad/${idComunidad}/topes`);
  }

*/

obtenerServiciosPorComunidad(idComunidad: number): Observable<any> {
  const tokenType = localStorage.getItem('token_type');
  const accessToken = localStorage.getItem('access_token');

  const headers = new HttpHeaders({
    Authorization: `${tokenType} ${accessToken}`
  });

  return this.http.get<any>(`${this.baseUrl}/usuarios/usuario/comunidad/${idComunidad}`, { headers });
}











obtenerTopesPorComunidad(idComunidad: number): Observable<any> {
  const tokenType = localStorage.getItem('token_type');
  const accessToken = localStorage.getItem('access_token');

  const headers = new HttpHeaders({
    Authorization: `${tokenType} ${accessToken}`
  });

  return this.http.get<any>(`${this.baseUrl}/usuarios/usuario/comunidad/${idComunidad}/topes`, { headers });
}



}
