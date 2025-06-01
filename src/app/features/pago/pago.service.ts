import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  confirmarPago(id_plan: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/billing/planes/${id_plan}/seleccionar`, {}, { headers });
  }
  

}