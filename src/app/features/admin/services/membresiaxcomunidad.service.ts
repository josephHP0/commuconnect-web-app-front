import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface PlanPorComunidad {
  id_plan: number;
  nombre: string;
  duracion: number;
  topes: number | null;
  precio: number;
}
@Injectable({
  providedIn: 'root'
})
export class MembresiaxcomunidadService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerPlanesPorComunidad(id_comunidad: number): Observable<PlanPorComunidad[]> {
    return this.http.get<PlanPorComunidad[]>(`${this.baseUrl}/billing/comunidades/${id_comunidad}/planes`);
  }

  eliminarPlan(idPlan: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/billing/planes/${idPlan}`);
  }
}
