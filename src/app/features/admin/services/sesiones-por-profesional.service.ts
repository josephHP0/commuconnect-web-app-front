import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; 
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionesPorProfesionalService {

 
    private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

obtenerSesionesVirtuales(idProfesional: number): Observable<any> {
  const tokenType = localStorage.getItem('token_type');
  const accessToken = localStorage.getItem('access_token');

  const headers = new HttpHeaders({
    Authorization: `${tokenType} ${accessToken}`
  });

  const url = `${this.baseUrl}/services/profesionales/${idProfesional}/sesiones-virtuales`;

  return this.http.get<any>(url, { headers });
}

obtenerDetalleSesion(idSesion: number): Observable<any> {

  
  const url = `${this.baseUrl}/services/sesiones-virtuales/${idSesion}/detalle`; // Ajusta si tu ruta es distinta
  const tokenType = localStorage.getItem('token_type');
  const accessToken = localStorage.getItem('access_token');

  const headers = new HttpHeaders({
    Authorization: `${tokenType} ${accessToken}`
  });

  return this.http.get<any>(url, { headers });
}



}
