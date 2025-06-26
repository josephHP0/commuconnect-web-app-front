import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { HttpClient ,HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosPorComunidadService {

   private readonly baseUrl = environment.apiUrl;
   // O usa environment.apiUrl si tienes proxy
  
    constructor(private http: HttpClient) {}







    obtenerServiciosPorComunidad(idComunidad: number): Observable<any> {
      const tokenType = localStorage.getItem('token_type');
      const accessToken = localStorage.getItem('access_token');
    
      const headers = new HttpHeaders({
        Authorization: `${tokenType} ${accessToken}`
      });
    
      return this.http.get<any>(`${this.baseUrl}/usuarios/usuario/comunidad/${idComunidad}`, { headers });
    }


    obtenerServiciosDisponiblesPorComunidad(idComunidad: number): Observable<any>{

      const tokenType = localStorage.getItem('token_type');
      const accessToken = localStorage.getItem('access_token');
    
      const headers = new HttpHeaders({
        Authorization: `${tokenType} ${accessToken}`
      });
    
      return this.http.get<any>(`${this.baseUrl}/services/admin/comunidad/${idComunidad}/servicios-disponibles`, { headers });

     
    }


    agregarServicioAComunidad(idComunidad: number,idServicio: number){

     

      const tokenType = localStorage.getItem('token_type');
      const accessToken = localStorage.getItem('access_token');
    
      const headers = new HttpHeaders({
        Authorization: `${tokenType} ${accessToken}`
      });
    
      return this.http.post(
        `${this.baseUrl}/services/admin/comunidad/${idComunidad}/servicio/${idServicio}/anhadir`,
        {}, // body vacío
        {
          headers: new HttpHeaders({
            Authorization: `${tokenType} ${accessToken}`
          })
        }
      );
      

    }


   


    eliminarServicioPorComunidad(idComunidad: number, idServicio: number) {
   
    
      const tokenType = localStorage.getItem('token_type');
      const accessToken = localStorage.getItem('access_token');
    
      const headers = new HttpHeaders({
        Authorization: `${tokenType} ${accessToken}`,
        'Content-Type': 'application/json'
      });
    
     
      
      return this.http.patch(`${this.baseUrl}/services/admin/comunidad/${idComunidad}/servicio/${idServicio}/estado?estado=0`, null, { headers });
    }
    



  
}
