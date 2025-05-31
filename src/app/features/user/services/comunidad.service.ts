import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Comunidad {
  id_comunidad: number;
  nombre: string;
  slogan: string;
  imagen: string | null;  
}

@Injectable({
  providedIn: 'root',
})
export class ComunidadService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getComunidades(): Observable<Comunidad[]> {
      return this.http.get<Comunidad[]>(`${this.baseUrl}/comunidades/listar_comunidad`);
    }
  unirseAComunidad(idComunidad: number): Observable<any> {
    //return this.http.post(`${this.baseUrl}/comunidades/${idComunidad}/usuarios/unir_cliente_comunidad`, {});
    return this.http.post(`${this.baseUrl}/usuarios/unir_cliente_comunidad`, {});
  }
}
