import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ProfesionalCreate {
  nombre_completo: string;
  email: string;
  id_servicio: number;
  formulario: string;
}
@Injectable({
  providedIn: 'root'
})
export class CrearProfesionalUnitarioService {
  private readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  registrarProfesional(data: ProfesionalCreate): Observable<any> {
    return this.http.post(`${this.baseUrl}/services/`, data);
  }
}
