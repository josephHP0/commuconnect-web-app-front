import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

export interface UserTokenPayload {
  sub: string;
  nombre: string;
  apellido: string;
  email: string;
  // agrega más
}
export interface Plan {
  id_plan: number;
  titulo: string;
  descripcion: string;
  topes: number;
  precio: number;
}


@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  
  //para planes
  getPlanes(): Observable<Plan[]> {
      return this.http.get<Plan[]>(`${this.baseUrl}/billing/planes`);
  }
  //esto agrego para registrar la inscripción
  //prueba 1
  /*registrarInscripcion(id_comunidad: number, id_plan?: number): Observable<any> {
    const token_type = localStorage.getItem('token_type') || 'Bearer';
    const access_token = localStorage.getItem('access_token') || '';

    const headers = new HttpHeaders({
      'Authorization': `${token_type} ${access_token}`
    });

    const body = {
      id_comunidad,
      id_plan
    };

    return this.http.post(`${this.baseUrl}/billing/inscripcion`, body, { headers });
  }*/
 //prueba 2
 /*registrarInscripcion(id_comunidad: number, id_plan?: number): Observable<any> {
    const token_type = localStorage.getItem('token_type') || 'Bearer';
    const access_token = localStorage.getItem('access_token') || '';

    const headers = new HttpHeaders({
      'Authorization': `${token_type} ${access_token}`
    });

    // Crear parámetros en query string
    let params = new HttpParams().set('id_comunidad', id_comunidad.toString());
    if (id_plan !== undefined) {
      params = params.set('id_plan', id_plan.toString());
    }

    return this.http.post(
      `${this.baseUrl}/billing/inscripcion`,
      {}, // body vacío
      { headers, params }
    );
  }*/
  //preuba 3
  registrarInscripcion(id_comunidad: number, id_plan?: number, id_pago?: number): Observable<any> {
    const token_type = localStorage.getItem('token_type') || 'Bearer';
    const access_token = localStorage.getItem('access_token') || '';

    const headers = new HttpHeaders({
      'Authorization': `${token_type} ${access_token}`
    });

    let params = new HttpParams().set('id_comunidad', id_comunidad.toString());

    if (id_plan !== undefined) {
      params = params.set('id_plan', id_plan.toString());
    }

    if (id_pago !== undefined) {
      params = params.set('id_pago', id_pago.toString());
    }

    return this.http.post(
      `${this.baseUrl}/billing/inscripcion`,
      {},  // body vacío
      { headers, params }
    );
  }





  seleccionarPlan(id_plan: number): Observable<any> {
      const token_type = localStorage.getItem('token_type') || 'Bearer';
      const access_token = localStorage.getItem('access_token') || '';

      const headers = new HttpHeaders({
        'Authorization': `${token_type} ${access_token}`
      });

      return this.http.post(`${this.baseUrl}/billing/planes/${id_plan}/seleccionar`, {}, { headers });
    }
    getDatosUsuarioDesdeToken(): UserTokenPayload | null {
    const token = localStorage.getItem('access_token'); // 
    if (!token) return null;

    try {
      const decoded = jwtDecode<UserTokenPayload>(token);
      return decoded;
    } catch (e) {
      console.error('Token inválido', e);
      return null;
    }
  }

  /*confirmarPago(id_plan: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/billing/planes/${id_plan}/seleccionar`, {}, { headers });
  }*/
 pagarComunidad(id_comunidad: number): Observable<any> {
    const token_type = localStorage.getItem('token_type') || 'Bearer';
    const access_token = localStorage.getItem('access_token') || '';

    const headers = new HttpHeaders({
      'Authorization': `${token_type} ${access_token}`
    });

    return this.http.post(`${this.baseUrl}/billing/comunidades/${id_comunidad}/pagar`, {}, { headers });
  }

  

}