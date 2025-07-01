import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanPorComunidad } from './membresiaxcomunidad.service';

export interface ComunidadXPlanCreate {
  id_comunidad: number;
  id_plan: number;
}


@Injectable({
  providedIn: 'root'
})
export class ComunidadxplanCreateService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  obtenerPlanesNoAsociados(idComunidad: number): Observable<PlanPorComunidad[]> {
    return this.http.get<PlanPorComunidad[]>(`${this.baseUrl}/billing/no-asociados/${idComunidad}`);
  }

  agregarPlanAComunidad(data: ComunidadXPlanCreate): Observable<any> {
    return this.http.post(`${this.baseUrl}/billing/agregar-plan`, data);
  }

}
