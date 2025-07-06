import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeographyService {
  private baseUrl = environment.apiUrl + '/geography';

  constructor(private http: HttpClient) {}

  getDepartamentos() {
    return this.http.get<any[]>(`${this.baseUrl}/departamentos`);
  }


  getDistritos(idDepartamento: number) {
    return this.http.get<any[]>(`${this.baseUrl}/distritos/${idDepartamento}`);
  }
}
