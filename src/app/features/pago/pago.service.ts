import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Comunidad {
  id_comunidad: number;
  nombre: string;
  slogan: string;
  imagen: string;
}
export interface Plan {
  id_plan: number;
  titulo: string;
  descripcion: string;
  topes: number;
  precio: number;
}


@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  //para planes
  getPlanes(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.baseUrl}/billing/planes`);
}

seleccionarPlan(id_plan: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/billing/planes/${id_plan}/seleccionar`, {});
}



}