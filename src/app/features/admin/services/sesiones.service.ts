import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SesionPresencial {
  id?: number;
  id_servicio: number;
  id_local: number;
  fecha_inicio: string;
  fecha_fin: string;
  capacidad?: number;
  descripcion?: string;
  tipo_sesion?: string;
  estado?: number;
  // Campos adicionales que podrían estar en el modelo del backend
  fecha_creacion?: string;
  fecha_actualizacion?: string;
  creado_por?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SesionesService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las sesiones asociadas a un servicio específico
   * @param idServicio ID del servicio
   * @returns Observable con la lista de sesiones
   */
  obtenerSesionesPorServicio(idServicio: number): Observable<SesionPresencial[]> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`
    });

    return this.http.get<SesionPresencial[]>(
      `${this.baseUrl}/services/sesiones-presenciales/servicio/${idServicio}`,
      { headers }
    );
  }

  /**
   * Carga masiva de sesiones presenciales desde archivo Excel
   * @param idServicio ID del servicio
   * @param archivo Archivo Excel con las sesiones
   * @returns Observable con el resultado de la carga
   */
  cargaMasivaSesionesPresenciales(idServicio: number, archivo: File): Observable<any> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    const formData = new FormData();
    formData.append('archivo', archivo);

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`
    });

    return this.http.post(
      `${this.baseUrl}/services/carga-masiva-sesiones-presenciales/${idServicio}`,
      formData,
      { headers }
    );
  }

  /**
   * Crea una nueva sesión presencial
   * @param sesion Datos de la sesión a crear
   * @returns Observable con la sesión creada
   */
  crearSesionPresencial(sesion: Partial<SesionPresencial>): Observable<SesionPresencial> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<SesionPresencial>(`${this.baseUrl}/services/sesiones-presenciales`, sesion, { headers });
  }

  /**
   * Actualiza una sesión presencial existente
   * @param id ID de la sesión
   * @param sesion Datos actualizados de la sesión
   * @returns Observable con la sesión actualizada
   */
  actualizarSesionPresencial(id: number, sesion: Partial<SesionPresencial>): Observable<SesionPresencial> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<SesionPresencial>(`${this.baseUrl}/services/sesiones-presenciales/${id}`, sesion, { headers });
  }

  /**
   * Elimina una sesión presencial
   * @param id ID de la sesión a eliminar
   * @returns Observable con la respuesta
   */
  eliminarSesionPresencial(id: number): Observable<any> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`
    });

    return this.http.delete(`${this.baseUrl}/services/sesiones-presenciales/${id}`, { headers });
  }
}
