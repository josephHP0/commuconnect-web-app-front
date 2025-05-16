import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComunidadService {
  private apiUrl = 'http://44.194.107.188:8000/listar_comunidad';

  constructor(private http: HttpClient) {}

  obtenerComunidades() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
