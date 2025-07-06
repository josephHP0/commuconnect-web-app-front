import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LocalCreate {
  id_departamento: number;
  id_distrito: number;
  id_servicio?: number | null;
  direccion_detallada?: string;
  responsable?: string;
  nombre?: string;
  link?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrearLocalUnitarioService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registrarLocal(data: LocalCreate): Observable<any> {
    return this.http.post(`${this.baseUrl}/services/locales`, data);
  }
}
