// Se importa el decorador Injectable de Angular para que el servicio pueda ser inyectado en otros componentes
import { Injectable } from '@angular/core';

// Se importa HttpClient para poder hacer peticiones HTTP al backend
import { HttpClient } from '@angular/common/http';

// Se importa Observable, ya que el método `login` retornará un Observable
import { Observable } from 'rxjs';

// Se importa el archivo de configuración `environment` para obtener la URL base de la API
import { environment } from 'src/environments/environment';




// Define la estructura de la solicitud de login (qué datos se enviarán en el cuerpo de la solicitud)
interface LoginRequest {
  email: string;
  password: string;
}

// Define la estructura de la respuesta del servidor después de un login exitoso (qué datos esperamos recibir)
interface LoginResponse {
  access_token: string;
  token_type: string;
}



@Injectable({
  providedIn: 'root'
})


export class AuthService {

  // Define la URL base de la API, que proviene del archivo `environment`
  private readonly baseUrl = environment.apiUrl;


  // El constructor inyecta el servicio `HttpClient` para realizar solicitudes HTTP
  constructor(private readonly http: HttpClient) { }


    // Método para iniciar sesión, recibe el email y la contraseña del usuario
    // Retorna un Observable de tipo LoginResponse, que contiene el token de acceso

  login(email: string, password: string): Observable<LoginResponse> {

    // Crea el cuerpo de la solicitud, con los datos de login proporcionados
    const body = {
      email: email,
      password: password,
    };

    // Realiza una solicitud POST al endpoint de login del backend
    // El tipo de respuesta esperado es `LoginResponse`

    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, body);
  }
}
