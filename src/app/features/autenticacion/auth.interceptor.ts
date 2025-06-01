import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    const tokenType = localStorage.getItem('token_type') || 'Bearer';

    if (token) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `${tokenType} ${token}`
        }
      });
      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}
