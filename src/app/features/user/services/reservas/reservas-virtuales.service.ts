import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface FechaSesion {
  id_sesion_virtual: number;
  id_sesion: number | null;
  dia: string | null;
  hora: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ReservasVirtualesService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // GET /api/services/profesionales/{id_servicio}
  getProfesionales(id_servicio: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/services/profesionales/${id_servicio}`);
  }

  // GET /api/reservations/fechas-sesiones_virtuales_por_profesional/{id_profesional}
  getFechasDisponibles(id_profesional: number): Observable<FechaSesion[]> {
    return this.http.get<{ fechas_inicio: FechaSesion[] }>(`${this.baseUrl}/reservations/fechas-sesiones_virtuales_por_profesional/${id_profesional}`)
      .pipe(
        map(response => response.fechas_inicio)
      );
  }

  // GET /api/reservations/reserva-existe/{id_sesion}
  verificarReservaExiste(idSesion: number): Observable<boolean> {
    return this.http.get<{ reserva_existente: boolean }>(`${this.baseUrl}/reservations/reserva-existe/${idSesion}`)
      .pipe(
        map(response => response.reserva_existente)
      );
  }
}
