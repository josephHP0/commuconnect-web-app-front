import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface InfoInscripcion {
  id_inscripcion: number;
  estado: number;
  titulo: string;
  descripcion_plan: string; 
  precio: number;
  periodo: string;
  fecha_inicio: string;
  fecha_fin: string;
}
export interface EsConTopesResponse {
  esPlanConTopes: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class MembresiaUserService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  obtenerInfoInscripcion(idComunidad: number): Observable<InfoInscripcion> {
    return this.http.get<InfoInscripcion>(`${this.baseUrl}/billing/usuario/comunidad/${idComunidad}/info-inscripcion`);
  }

  esPlanConTopes(idInscripcion: number): Observable<EsConTopesResponse> {
    return this.http.get<EsConTopesResponse>(`${this.baseUrl}/billing/usuario/plan/${idInscripcion}/es-con-topes`);
  }
//suspender membresia
  congelarMembresiaConFormulario(
    idInscripcion: number,
    motivo: string,
    fechaInicio: string,
    fechaFin: string,
    archivo?: File | null
  ): Observable<any> {
    const params: any = {
      motivo,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin
    };

    // Si hay archivo, debes enviarlo como FormData, pero si el backend lo espera como query param, debes convertirlo a base64 o string
    // Si el backend espera archivo como multipart, debes consultar cómo enviarlo correctamente
    // Aquí lo enviamos como query param si es string
    if (archivo) {
      // Si el backend espera el archivo como string, deberías convertirlo a base64 antes de enviarlo
      // params.archivo = archivoBase64;
    }

    return this.http.post(
      `${this.baseUrl}/billing/inscripcion/${idInscripcion}/solicitar-congelamiento`,
      {},
      { params }
    );
  }

  reactivarMembresia(idInscripcion: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/billing/inscripcion/${idInscripcion}/reactivar`, {});
  }
  // membresia-user.service.ts
  cancelarMembresia(idInscripcion: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/billing/inscripcion/${idInscripcion}/cancelar`, {});
  }
  pagarMembresia(idComunidad: number) {
    return this.http.post(`${this.baseUrl}/billing/comunidades/${idComunidad}/pagar`, {});
  }
  




}
