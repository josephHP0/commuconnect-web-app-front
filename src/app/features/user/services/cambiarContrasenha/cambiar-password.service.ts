import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// DTO para el cambio de contraseña
export interface CambioPasswordDTO {
  actual: string;
  nueva: string;
  repetir: string;
}@Injectable({
  providedIn: 'root'
})
export class CambiarPasswordService {
  private readonly baseUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) { }
  cambiarPassword(data: CambioPasswordDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/usuario/cambiar-password`, data);
  }
}
