import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface ClienteCreate {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  tipo_documento: string;
  num_doc: string;
  fecha_nac: string; // formato ISO o yyyy-mm-dd
  id_departamento: number;
  id_distrito: number;
  direccion: string;
  numero_telefono: string;
  genero: string;
  talla: number;
  peso: number;
}

@Injectable({
  providedIn: 'root'
})


export class CrearClienteUnitarioService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registrarCliente(data: ClienteCreate): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/cliente`, data);
  }
}
