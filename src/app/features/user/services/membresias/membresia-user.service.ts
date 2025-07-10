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
    return new Observable(observer => {
      if (archivo) {
        // Convertir archivo a base64
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          const base64Data = base64.split(',')[1]; // Remover el prefijo data:...;base64,
          
          // Crear query parameters incluyendo el archivo como base64
          const params = new URLSearchParams({
            motivo: motivo,
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            archivo: base64Data
          });

          const url = `${this.baseUrl}/billing/inscripcion/${idInscripcion}/solicitar-congelamiento?${params.toString()}`;
          
          this.http.post(url, {}).subscribe({
            next: (response) => observer.next(response),
            error: (error) => observer.error(error),
            complete: () => observer.complete()
          });
        };
        reader.onerror = () => observer.error('Error al leer el archivo');
        reader.readAsDataURL(archivo);
      } else {
        // Sin archivo
        const params = new URLSearchParams({
          motivo: motivo,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin
        });

        const url = `${this.baseUrl}/billing/inscripcion/${idInscripcion}/solicitar-congelamiento?${params.toString()}`;
        
        this.http.post(url, {}).subscribe({
          next: (response) => observer.next(response),
          error: (error) => observer.error(error),
          complete: () => observer.complete()
        });
      }
    });
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
