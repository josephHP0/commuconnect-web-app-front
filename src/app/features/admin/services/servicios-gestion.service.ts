import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Servicio {
  id_servicio: number;
  nombre: string;
  descripcion: string;
  modalidad: 'Presencial' | 'Virtual';
  imagen_base64?: string;
  imagen?: string; // Added for frontend display
  fecha_creacion?: string;
  creado_por?: string;
  fecha_modificacion?: string;
  modificado_por?: string;
  estado?: boolean;
}

export interface CrearServicioRequest {
  nombre: string;
  descripcion: string;
  modalidad: 'Presencial' | 'Virtual';
  imagen?: File;
}

@Injectable({
  providedIn: 'root'
})
export class ServiciosGestionService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token_type = localStorage.getItem('token_type') || 'Bearer';
    const access_token = localStorage.getItem('access_token') || '';
    
    return new HttpHeaders({
      'Authorization': `${token_type} ${access_token}`
    });
  }

  obtenerTodosLosServicios(query?: string): Observable<Servicio[]> {
    let url = `${this.baseUrl}/services/servicios`;
    if (query) {
      url += `?q=${query}`;
    }

    return this.http.get<Servicio[]>(url, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(servicios => servicios.map(servicio => ({
        ...servicio,
        imagen: servicio.imagen_base64 ? `data:image/jpeg;base64,${servicio.imagen_base64}` : undefined
      })))
    );
  }

  obtenerServicioPorId(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.baseUrl}/services/servicios/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(servicio => ({
        ...servicio,
        imagen: servicio.imagen_base64 ? `data:image/jpeg;base64,${servicio.imagen_base64}` : undefined
      }))
    );
  }

  crearServicio(servicio: CrearServicioRequest): Observable<Servicio> {
    const formData = new FormData();
    formData.append('nombre', servicio.nombre);
    formData.append('descripcion', servicio.descripcion);
    formData.append('modalidad', servicio.modalidad);
    
    if (servicio.imagen) {
      formData.append('imagen', servicio.imagen);
    }

    return this.http.post<Servicio>(`${this.baseUrl}/services/servicios`, formData, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(servicio => ({
        ...servicio,
        imagen: servicio.imagen_base64 ? `data:image/jpeg;base64,${servicio.imagen_base64}` : undefined
      }))
    );
  }

  actualizarServicio(id: number, servicio: CrearServicioRequest): Observable<Servicio> {
    const formData = new FormData();
    
    if (servicio.nombre) {
      formData.append('nombre', servicio.nombre);
    }
    if (servicio.descripcion) {
      formData.append('descripcion', servicio.descripcion);
    }
    if (servicio.modalidad) {
      formData.append('modalidad', servicio.modalidad);
    }
    if (servicio.imagen) {
      formData.append('imagen', servicio.imagen);
    }

    return this.http.put<Servicio>(`${this.baseUrl}/services/servicios/${id}`, formData, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(servicio => ({
        ...servicio,
        imagen: servicio.imagen_base64 ? `data:image/jpeg;base64,${servicio.imagen_base64}` : undefined
      }))
    );
  }

  eliminarServicio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/services/servicios/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}