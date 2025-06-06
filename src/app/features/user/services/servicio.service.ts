import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private baseUrl = 'http://localhost:8000'; // O usa environment.apiUrl si tienes proxy

  constructor(private http: HttpClient) {}

  obtenerServiciosPorComunidad(idComunidad: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario/comunidad/${idComunidad}`);
  }

  obtenerTopesPorComunidad(idComunidad: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/usuario/comunidad/${idComunidad}/topes`);
  }
}
