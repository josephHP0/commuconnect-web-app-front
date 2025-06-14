import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasPresencialesService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }




  verificarReservaExistePresencial(id_sesion: number): Observable<{ reserva_existente: boolean }> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');
  
    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`
    });
  
    return this.http.get<{ reserva_existente: boolean }>(
      `${this.baseUrl}/reservations/reserva-existe/${id_sesion}`,
      { headers }
    );
  }
  

  ///api/reservations/summary/{id_sesion}


  obtenerResumenReserva(id_sesion: number): Observable<any> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`
    });

    return this.http.get<any>(`${this.baseUrl}/reservations/summary/${id_sesion}`, { headers });
  }


  crearReserva(idSesion: number): Observable<any> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');
  
    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.baseUrl}/reservations`, { id_sesion: idSesion }, { headers });
  }
  

}
