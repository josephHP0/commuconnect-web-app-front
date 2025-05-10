import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';




interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
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
}
