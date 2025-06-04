import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Servicio {
  nombre: string;
}

export interface ComunidadContexto {
  id_comunidad: number;
  nombre: string;
  descripcion: string;
  imagen_base64: string;
  servicios: Servicio[];
  estado_membresia: string;
}

@Injectable({
  providedIn: 'root',
})
export class ComunidadService {
  private apiUrl = 'http://127.0.0.1:8000/api/comunidades/listar_comunidad';

  constructor(private http: HttpClient) {}

  obtenerComunidades(): Observable<ComunidadContexto[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<ComunidadContexto[]>(this.apiUrl, { headers });
  }
  obtenerComunidadPorId(id: number): Observable<ComunidadContexto> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<ComunidadContexto>(
      `http://127.0.0.1:8000/api/usuarios/usuario/comunidad/${id}`,
      { headers }
    );
  }
}
