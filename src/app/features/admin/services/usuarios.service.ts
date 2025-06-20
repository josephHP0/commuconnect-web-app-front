import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  cargarMasivamente(archivo: File): Observable<any> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');
    
    const formData = new FormData();
    formData.append('archivo', archivo);
  
    return this.http.post(
      `${this.baseUrl}/usuarios/clientes/carga-masiva`,
      formData,
      {
        headers: new HttpHeaders({
          Authorization: `${tokenType} ${accessToken}`
          // No agregar Content-Type, el navegador lo hará automáticamente para FormData
        })
      }
    );
  }
  





}
