import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';



 export interface ClienteInterno {
  id_cliente: number;
  tipo_documento: string;
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

export interface Cliente {
  id_usuario: number;
  nombre: string;
  apellido: string;
  email: string;
  tipo: string;
  fecha_creacion: string;
  creado_por: string;
  estado: boolean;
  cliente: ClienteInterno;
}


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

 listarClientes(): Observable<Cliente[]> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    return this.http.get<Cliente[]>(
      `${this.baseUrl}/usuarios/clientes`,
      {
        headers: new HttpHeaders({
          Authorization: `${tokenType} ${accessToken}`
        })
      }
    );
  }


  getClientePorId(id: number): Observable<any> {
  const tokenType = localStorage.getItem('token_type');
  const accessToken = localStorage.getItem('access_token');

  return this.http.get<any>(
    `${this.baseUrl}/usuarios/cliente/id/${id}`,
    {
      headers: new HttpHeaders({
        Authorization: `${tokenType} ${accessToken}`
      })
    }
  );
}

actualizarCliente(id: number, clienteDto: any): Observable<any> {
  const tokenType = localStorage.getItem('token_type');       // Ej. "Bearer"
  const accessToken = localStorage.getItem('access_token');   // JWT real

 

  if (!tokenType || !accessToken) {
    throw new Error('Token no disponible. ¿Estás autenticado?');
  }

  const headers = new HttpHeaders({
    Authorization: `${tokenType} ${accessToken}`,
    'Content-Type': 'application/json'
  });

  const url = `${this.baseUrl}/usuarios/cliente/${id}`; // Ajusta el path si es necesario

  console.log('🟡 Enviando PUT a:', url);
  console.log('📦 Cuerpo del DTO:', clienteDto);

  return this.http.put(url, clienteDto, { headers });
}




  eliminarCliente(id: number): Observable<any> {


  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.delete(`${this.baseUrl}/usuarios/eliminar_cliente/${id}`, { headers });
 
}


  





}
