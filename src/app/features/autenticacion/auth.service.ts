import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'; // Cliente HTTP de Angular
import { of,BehaviorSubject,Observable } from 'rxjs'; // Para manejar respuestas asincrónicas
import { environment } from 'src/environments/environment'; // Para obtener la URL base del backend
import { map,tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

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


  private logueadoSubject = new BehaviorSubject<boolean>(this.tieneToken());
  logueado$ = this.logueadoSubject.asObservable();



  constructor(private readonly http: HttpClient) { 


    console.log('[DEBUG] ¿Token inicial?:', this.tieneToken());
    console.log('[DEBUG] Valor inicial del BehaviorSubject:', this.logueadoSubject.value);
  }


  // Verifica si ya hay token guardado
  private tieneToken(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token || token === 'undefined') {
      localStorage.clear(); // 🔥 limpia token basura
      return false;
    }
    return true;
  }


  login(email: string, password: string): Observable<LoginResponse> {
      const body = {
        email: email,
        password: password,
      };

      //return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, body);

      return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, body).pipe(
        tap((response: LoginResponse) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('token_type', response.token_type);
          localStorage.setItem('user_rol', response.user_rol);
          this.logueadoSubject.next(true); // 🔔 Notifica que está logueado
        })
      );
  }

  // Método para registrar un nuevo usuario
  register(data: RegisterRequest): Observable<any> {
    // Hacemos una petición POST a la URL: https://tu-api.com/usuarios/register
    return this.http.post<any>(`${this.baseUrl}/usuarios/cliente`, data);
  }

  logout(): void {
    localStorage.clear();
    this.logueadoSubject.next(false); // 🔔 Notifica que cerró sesión
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


verificarToken(): Observable<boolean> {
  const token = localStorage.getItem('access_token');
  const tokenType = localStorage.getItem('token_type');

  if (!token || !tokenType) {
    return of(false);
  }

  const headers = new HttpHeaders({
    Authorization: `${tokenType} ${token}`
  });

  return this.http.get(`${this.baseUrl}/auth/validar-token`, { headers }).pipe(
    map(() => true),
    catchError(() => of(false)) // Si hay error, consideramos que no está logueado
  );
}

setEstadoLogin(estado: boolean): void {
  this.logueadoSubject.next(estado);
}


}
