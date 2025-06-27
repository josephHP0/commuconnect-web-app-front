import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanPorComunidad } from './membresiaxcomunidad.service';

export interface ComunidadXPlanCreate {
  id_comunidad: number;
  titulo: string;
  duracion: number;
  topes: number | null;
  precio: number;
}


@Injectable({
  providedIn: 'root'
})
export class ComunidadxplanCreateService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  agregarPlanAComunidad(data: ComunidadXPlanCreate): Observable<any> {
    return this.http.post(`${this.baseUrl}/billing/agregar-plan`, data);
  }

}
