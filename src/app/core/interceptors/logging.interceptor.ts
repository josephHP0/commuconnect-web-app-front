import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { KibanaService } from 'src/app/features/admin/services/kibana.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private kibanaService: KibanaService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap({
        next: (event) => {
          // Solo loggear respuestas exitosas importantes (opcionales)
          // this.kibanaService.logInfo(`HTTP Success: ${req.method} ${req.url}`, 'http-interceptor').subscribe();
        },
        error: (error: HttpErrorResponse) => {
          // Loggear errores HTTP automáticamente al backend
          this.kibanaService.logError(
            `HTTP Error: ${error.status} ${error.statusText} - ${req.method} ${req.url}`,
            error,
            'http-interceptor',
            {
              url: req.url,
              method: req.method,
              status: error.status,
              statusText: error.statusText,
              error_message: error.message,
              response_body: error.error
            }
          ).subscribe({
            error: (logError) => {
              // Si falla el logging, solo mostrar en consola (no crear bucle infinito)
              console.warn('Error enviando log de error HTTP:', logError);
            }
          });
        }
      })
    );
  }
} 