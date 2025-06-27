import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Profesional {
  id_profesional: number;
  nombre_completo: string;
  id_servicio: number;
  formulario: any;
  fecha_creacion: string;
  creado_por: string;
  fecha_modificacion: string;
  modificado_por: string;
  estado: boolean;
  email: string; // <-- Añadido aquí
}

@Injectable({
  providedIn: 'root'
})
export class ProfesionalesService {
  private apiUrl = `${environment.apiUrl}/services/profesionales`;

  constructor(private http: HttpClient) {}

  getProfesionalesPorServicio(idServicio: number): Observable<Profesional[]> {
    return this.http.get<Profesional[]>(`${this.apiUrl}/${idServicio}`);
  }
}