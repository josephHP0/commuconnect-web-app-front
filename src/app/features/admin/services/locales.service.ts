import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LocalOut {
  id_local: number;
  id_departamento: number;
  id_distrito: number;
  direccion_detallada?: string;
  id_servicio?: number;
  responsable?: string;
  nombre?: string;
  link?: string;
  fecha_creacion?: string;
  creado_por?: string;
  fecha_modificacion?: string;
  modificado_por?: string;
  estado?: number;
  showMenu?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LocalesService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los locales asociados a un servicio específico
   * @param idServicio ID del servicio
   * @returns Observable con la lista de locales activos
   */
  obtenerLocalesPorServicio(idServicio: number): Observable<LocalOut[]> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    console.log('Token type:', tokenType); // Debug
    console.log('Access token exists:', !!accessToken); // Debug (no mostrar el token completo por seguridad)
    
    if (!tokenType || !accessToken) {
      console.error('No se encontraron tokens de autenticación');
      throw new Error('No se encontraron tokens de autenticación');
    }

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.baseUrl}/services/por-servicio/${idServicio}`;
    console.log('URL del request:', url); // Debug




    return this.http.get<LocalOut[]>(url, { headers });
  }

  /**
   * Crea un nuevo local
   * @param local Datos del local a crear
   * @returns Observable con el local creado
   */
  crearLocal(local: Partial<LocalOut>): Observable<LocalOut> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<LocalOut>(`${this.baseUrl}/services/locales`, local, { headers });
  }

  /**
   * Actualiza un local existente
   * @param id ID del local
   * @param local Datos actualizados del local
   * @returns Observable con el local actualizado
   */
  actualizarLocal(id: number, local: Partial<LocalOut>): Observable<LocalOut> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<LocalOut>(`${this.baseUrl}/services/locales/${id}`, local, { headers });
  }

  /**
   * Elimina un local (cambio de estado a inactivo)
   * @param id ID del local a eliminar
   * @returns Observable con la respuesta
   */
  eliminarLocal(id: number): Observable<any> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`
    });

    return this.http.delete(`${this.baseUrl}/services/locales/${id}`, { headers });
  }

  /**
   * Carga masiva de locales desde archivo Excel
   * @param idServicio ID del servicio
   * @param archivo Archivo Excel con los locales
   * @returns Observable con el resultado de la carga
   */
  cargaMasivaLocales(idServicio: number, archivo: File): Observable<any> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    const formData = new FormData();
    formData.append('archivo', archivo);

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`
    });

    return this.http.post(
      `${this.baseUrl}/services/locales-carga-masiva/${idServicio}`,
      formData,
      { headers }
    );
  }
}
