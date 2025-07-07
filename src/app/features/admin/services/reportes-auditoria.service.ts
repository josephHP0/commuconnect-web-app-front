import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LogError {
  id: number;
  timestamp: string;
  level: string;
  message: string;
  stack_trace?: string;
  user_id?: number;
  ip_address?: string;
}

export interface AuditRecord {
  id: number;
  action: string;
  table_name: string;
  record_id: number;
  old_values?: any;
  new_values?: any;
  user_id: number;
  user_email: string;
  timestamp: string;
  ip_address: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportesAuditoriaService {
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

  // Métodos de Auditoría (solo estos funcionan)
  getErrorLogs(limit?: number, offset?: number): Observable<LogError[]> {
    let url = `${this.baseUrl}/admin/logs/errors`;
    if (limit) url += `?limit=${limit}`;
    if (offset) url += `${limit ? '&' : '?'}offset=${offset}`;
    
    return this.http.get<LogError[]>(url, {
      headers: this.getAuthHeaders()
    });
  }

  getAuditRecords(limit?: number, offset?: number): Observable<AuditRecord[]> {
    let url = `${this.baseUrl}/admin/audit/records`;
    if (limit) url += `?limit=${limit}`;
    if (offset) url += `${limit ? '&' : '?'}offset=${offset}`;
    
    return this.http.get<AuditRecord[]>(url, {
      headers: this.getAuthHeaders()
    });
  }

  // Nota: Los métodos de reportes fueron removidos ya que solo son botones informativos
  // Cuando se implemente el backend, se pueden agregar de nuevo:
  // - generateCommunityReservationReport()
  // - generateReservationReport() 
  // - generatePaymentReport()
  // - exportReport()
} 