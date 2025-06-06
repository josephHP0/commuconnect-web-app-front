import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Comunidad {
  id_comunidad: number;
  nombre: string;
  slogan: string;
  imagen: string | null;
}


export interface Servicio {
  nombre: string;
}

export interface ComunidadContexto {
  id_comunidad: number;
  nombre: string;
  slogan: string; /**/
  imagen: string;
  servicios: Servicio[];
  estado_membresia: string;
}

@Injectable({
  providedIn: 'root',
})
export class ComunidadService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}




  getComunidades(): Observable<Comunidad[]> {
      const token_type = localStorage.getItem('token_type');       // "Bearer"
      const access_token = localStorage.getItem('access_token');   // JWT

      const headers = new HttpHeaders({
        'Authorization': `${token_type} ${access_token}`
      });

      return this.http.get<Comunidad[]>(
        `${this.baseUrl}/comunidades/comunidades-sin-inscripcion`,
        { headers }
      );
  }


  unirseAComunidad(idComunidad: number): Observable<any> {
    const token_type = localStorage.getItem('token_type');       // "Bearer"
    const access_token = localStorage.getItem('access_token');   // JWT

    const headers = new HttpHeaders({
      'Authorization': `${token_type} ${access_token}`
    });

    const params = new HttpParams().set('id_comunidad', idComunidad.toString());

    return this.http.post(`${this.baseUrl}/usuarios/unir_cliente_comunidad`, null, { headers, params });
  }
  obtenerComunidades(): Observable<ComunidadContexto[]> {



const tokenType = localStorage.getItem('token_type');     // Por ejemplo: "Bearer"
  const accessToken = localStorage.getItem('access_token'); // El token JWT

  const headers = new HttpHeaders({
    Authorization: `${tokenType} ${accessToken}`            // "Bearer eyJ..."
  });



      return this.http.get<ComunidadContexto[]>(`${this.baseUrl}/usuarios/usuario/comunidades`, { headers });
  }
  /*
  obtenerComunidadPorId(id: number): Observable<ComunidadContexto> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<ComunidadContexto>(
      `${this.baseUrl}/usuarios/usuario/comunidad/${id}`,
      { headers }
    );
  }
    */

  obtenerComunidadPorId(id: number): Observable<ComunidadContexto> {
  const token_type = localStorage.getItem('token_type') || 'Bearer';
  const access_token = localStorage.getItem('access_token') || '';

  const headers = new HttpHeaders({
    'Authorization': `${token_type} ${access_token}`
  });

  return this.http.get<ComunidadContexto>(
    `${this.baseUrl}/usuarios/usuario/comunidad/${id}`,
    { headers }
  );
}









}
