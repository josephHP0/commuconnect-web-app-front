import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment'; 
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionesPorLocalService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

obtenerSesionesPresenciales(idLocal: number): Observable<any> {
  const tokenType = localStorage.getItem('token_type');
  const accessToken = localStorage.getItem('access_token');

  const headers = new HttpHeaders({
    Authorization: `${tokenType} ${accessToken}`
  });

  const url = `${this.baseUrl}/services/locales/${idLocal}/sesiones-presenciales`;

  

  return this.http.get<any>(url, { headers });
}
///api/services/sesiones-presenciales/{id}/detalle

obtenerDetalleSesion(idSesion: number): Observable<any> {

  
  const url = `${this.baseUrl}/services/sesiones-presenciales/${idSesion}/detalle`; // Ajusta si tu ruta es distinta
  const tokenType = localStorage.getItem('token_type');
  const accessToken = localStorage.getItem('access_token');

  const headers = new HttpHeaders({
    Authorization: `${tokenType} ${accessToken}`
  });

  return this.http.get<any>(url, { headers });
}


}
