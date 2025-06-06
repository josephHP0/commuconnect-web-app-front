import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'; // Cliente HTTP de Angular
import { Observable } from 'rxjs'; // Para manejar respuestas asincrónicas
import { environment } from 'src/environments/environment'; // Para obtener la URL base del backend
import { map } from 'rxjs/operators';


interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user_rol: string;
}


interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
 // repetir_password: string;
  tipo_documento: 'DNI' | 'CE'; // Debe coincidir con Literal
  num_doc: string;
  numero_telefono: string;
  id_departamento: number;
  id_distrito: number;
  direccion: string;
  fecha_nac: string;
  genero: string;
  talla: number;
  peso: number;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
      const body = {
        email: email,
        password: password,
      };

      return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, body);
  }

  // Método para registrar un nuevo usuario
  register(data: RegisterRequest): Observable<any> {
    // Hacemos una petición POST a la URL: https://tu-api.com/usuarios/register
    return this.http.post<any>(`${this.baseUrl}/usuarios/cliente`, data);
  }



 tieneComunidades(): Observable<boolean> {
  const tokenType = localStorage.getItem('token_type');
  const accessToken = localStorage.getItem('access_token');

  const headers = new HttpHeaders({
    Authorization: `${tokenType} ${accessToken}`
  });

  return this.http.get<{ tiene_comunidades: boolean }>(
    `${this.baseUrl}/auth/tiene-comunidades`,
    { headers }
  ).pipe(
    map(response => response.tiene_comunidades)
  );
}
}
