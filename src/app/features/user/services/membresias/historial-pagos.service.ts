import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InscripcionPago {
  id_inscripcion: number;
  fecha_inicio: string;
  titulo_plan: string;
  precio: number;
}

export interface DetallePago {
  nombre_membresia: string;
  fecha_pago: string;
  hora_pago: string;
  id_pago: number;
  tarjeta: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistorialPagosService {
  private baseUrl = '/api/billing';

  constructor(private http: HttpClient) {}

  getHistorialPagos(): Observable<InscripcionPago[]> {
    return this.http.get<InscripcionPago[]>(`${this.baseUrl}/usuario/inscripciones`);
  }

  getDetallePago(idInscripcion: number): Observable<DetallePago> {
    return this.http.get<DetallePago>(`${this.baseUrl}/inscripcion/${idInscripcion}/detalle`);
  }
}
