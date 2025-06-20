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

  cargarMasivamente(clientes: any[]): Observable<any> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');
  
    return this.http.post(
      `${this.baseUrl}/usuarios/clientes/carga-masiva`,
      clientes,
      {
        headers: new HttpHeaders({
          Authorization: `${tokenType} ${accessToken}`
        })
      }
    );
  }
  





}
