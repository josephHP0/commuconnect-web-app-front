import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LocalCreate {
  ubicacion: string;
  direccion: string;
  responsable_nombre: string;
  responsable_apellido: string;
  responsable_email: string;
  id_servicio?: number | null;
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
