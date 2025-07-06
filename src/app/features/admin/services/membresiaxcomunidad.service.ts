import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComunidadXPlanCreate } from './comunidadxplan-create.service';


export interface PlanPorComunidad {
  id_plan: number;
  titulo: string; 
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
    return this.http.get<PlanPorComunidad[]>(`${this.baseUrl}/billing/por-comunidad/${id_comunidad}`);
  }
  agregarPlanAComunidad(data: ComunidadXPlanCreate): Observable<any> {
    return this.http.post(`${this.baseUrl}/billing/agregar-plan`, data);
  }
  eliminarPlan(idPlan: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/billing/planes/${idPlan}`);
  }
}
