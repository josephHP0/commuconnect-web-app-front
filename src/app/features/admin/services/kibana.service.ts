import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

export interface KibanaLogEntry {
  '@timestamp': string;
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  message: string;
  source: string;
  user_id?: string;
  user_email?: string;
  ip_address?: string;
  stack_trace?: string;
  url?: string;
  method?: string;
  user_agent?: string;
  session_id?: string;
  component?: string;
  action?: string;
  additional_data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class KibanaService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');
    
    return new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Envía un log al backend (método principal para Netlify)
   */
  private sendLogToBackend(logEntry: Partial<KibanaLogEntry>): Observable<any> {
    const fullLogEntry: KibanaLogEntry = {
      '@timestamp': new Date().toISOString(),
      level: logEntry.level || 'INFO',
      message: logEntry.message || '',
      source: 'frontend',
      user_id: logEntry.user_id || localStorage.getItem('user_id') || undefined,
      user_email: logEntry.user_email || localStorage.getItem('user_email') || undefined,
      ip_address: logEntry.ip_address,
      stack_trace: logEntry.stack_trace,
      url: logEntry.url || window.location.href,
      method: logEntry.method,
      user_agent: navigator.userAgent,
      session_id: logEntry.session_id || this.generateSessionId(),
      component: logEntry.component,
      action: logEntry.action,
      additional_data: logEntry.additional_data
    };

    return this.http.post(`${this.baseUrl}/admin/logs/create`, fullLogEntry, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error enviando log al backend:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Obtiene logs desde el backend
   */
  getLogsFromBackend(
    level?: string, 
    startDate?: string, 
    endDate?: string,
    component?: string,
    limit: number = 100,
    offset: number = 0
  ): Observable<KibanaLogEntry[]> {
    let url = `${this.baseUrl}/admin/logs?limit=${limit}&offset=${offset}`;
    
    if (level) url += `&level=${level}`;
    if (startDate) url += `&start_date=${startDate}`;
    if (endDate) url += `&end_date=${endDate}`;
    if (component) url += `&component=${component}`;
    
    return this.http.get<KibanaLogEntry[]>(url, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error obteniendo logs del backend:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Métodos de conveniencia para diferentes tipos de logs
   */
  logError(message: string, error?: Error, component?: string, additionalData?: any): Observable<any> {
    return this.sendLogToBackend({
      level: 'ERROR',
      message,
      component,
      stack_trace: error?.stack,
      additional_data: {
        error_name: error?.name,
        error_message: error?.message,
        ...additionalData
      }
    });
  }

  logWarning(message: string, component?: string, additionalData?: any): Observable<any> {
    return this.sendLogToBackend({
      level: 'WARN',
      message,
      component,
      additional_data: additionalData
    });
  }

  logInfo(message: string, component?: string, action?: string, additionalData?: any): Observable<any> {
    return this.sendLogToBackend({
      level: 'INFO',
      message,
      component,
      action,
      additional_data: additionalData
    });
  }

  logDebug(message: string, component?: string, additionalData?: any): Observable<any> {
    return this.sendLogToBackend({
      level: 'DEBUG',
      message,
      component,
      additional_data: additionalData
    });
  }

  /**
   * Genera un ID de sesión único
   */
  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Verifica si el backend está disponible (método simplificado)
   */
  checkBackendConnection(): Observable<any> {
    return this.http.get(`${this.baseUrl}/health`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error conectando con el backend:', error);
        return throwError(error);
      })
    );
  }
} 