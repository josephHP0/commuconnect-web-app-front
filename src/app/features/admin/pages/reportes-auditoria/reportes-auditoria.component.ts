import { Component, OnInit } from '@angular/core';
import { ReportesAuditoriaService, AuditRecord } from '../../services/reportes-auditoria.service';
import { KibanaService, KibanaLogEntry } from '../../services/kibana.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes-auditoria',
  templateUrl: './reportes-auditoria.component.html',
  styleUrls: ['./reportes-auditoria.component.css']
})
export class ReportesAuditoriaComponent implements OnInit {
  currentSection: 'auditoria' | 'reportes' = 'auditoria';
  loading = false;

  constructor(
    private reportesService: ReportesAuditoriaService,
    private kibanaService: KibanaService
  ) { }

  ngOnInit(): void {
    // Ya no necesitamos verificar conexión a Elasticsearch
  }

  switchToAuditoria(): void {
    this.currentSection = 'auditoria';
  }

  switchToReportes(): void {
    this.currentSection = 'reportes';
  }

  // Métodos de Auditoría - Solo backend
  verLogsErrores(): void {
    this.loading = true;
    
    this.kibanaService.getLogsFromBackend('ERROR', undefined, undefined, undefined, 50, 0).subscribe({
      next: (logs: KibanaLogEntry[]) => {
        this.loading = false;
        this.mostrarLogsEnModal(logs);
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los logs de errores desde el servidor'
        });
        console.error(error);
      }
    });
  }

  verRegistrosAuditoria(): void {
    this.loading = true;
    this.reportesService.getAuditRecords(50, 0).subscribe({
      next: (records: AuditRecord[]) => {
        this.loading = false;
        this.mostrarAuditoriaEnModal(records);
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los registros de auditoría'
        });
        console.error(error);
      }
    });
  }

  // Métodos de Reportes - Solo botones informativos
  generarReporteComunidades(): void {
    Swal.fire({
      icon: 'info',
      title: 'Reporte de Comunidades',
      html: `
        <div class="text-left">
          <p><strong>Este reporte incluirá:</strong></p>
          <ul style="text-align: left; margin-left: 20px;">
            <li>Total de reservas por comunidad</li>
            <li>Miembros activos por comunidad</li>
            <li>Ingresos generados</li>
            <li>Servicios más utilizados</li>
          </ul>
          <hr>
          <small class="text-muted">
            <i class="fas fa-info-circle"></i> 
            Funcionalidad pendiente de implementación en el backend
          </small>
        </div>
      `,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#28a745'
    });
  }

  generarReporteReservas(): void {
    Swal.fire({
      icon: 'info',
      title: 'Reporte de Reservas',
      html: `
        <div class="text-left">
          <p><strong>Este reporte incluirá:</strong></p>
          <ul style="text-align: left; margin-left: 20px;">
            <li>Total de reservas (completadas, canceladas, pendientes)</li>
            <li>Reservas por servicio</li>
            <li>Tendencias mensuales</li>
            <li>Estadísticas de uso</li>
          </ul>
          <hr>
          <small class="text-muted">
            <i class="fas fa-info-circle"></i> 
            Funcionalidad pendiente de implementación en el backend
          </small>
        </div>
      `,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#28a745'
    });
  }

  generarReportePagos(): void {
    Swal.fire({
      icon: 'info',
      title: 'Reporte de Pagos',
      html: `
        <div class="text-left">
          <p><strong>Este reporte incluirá:</strong></p>
          <ul style="text-align: left; margin-left: 20px;">
            <li>Ingresos totales del sistema</li>
            <li>Transacciones exitosas vs fallidas</li>
            <li>Ingresos por comunidad</li>
            <li>Análisis financiero mensual</li>
          </ul>
          <hr>
          <small class="text-muted">
            <i class="fas fa-info-circle"></i> 
            Funcionalidad pendiente de implementación en el backend
          </small>
        </div>
      `,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#28a745'
    });
  }

  // Métodos auxiliares para mostrar datos
  private mostrarLogsEnModal(logs: KibanaLogEntry[]): void {
    const tableRows = logs.map(log => 
      `<tr>
        <td>${new Date(log['@timestamp']).toLocaleString()}</td>
        <td><span class="badge badge-${this.getLogLevelClass(log.level)}">${log.level}</span></td>
        <td style="max-width: 300px; word-wrap: break-word;">${log.message}</td>
        <td>${log.user_email || log.user_id || 'Sistema'}</td>
        <td>${log.component || 'N/A'}</td>
        <td>${log.source}</td>
      </tr>`
    ).join('');

    Swal.fire({
      title: 'Logs de Errores (Desde Backend)',
      html: `
        <div style="max-height: 500px; overflow-y: auto;">
          <table class="table table-striped table-sm">
            <thead class="thead-dark">
              <tr>
                <th>Fecha</th>
                <th>Nivel</th>
                <th>Mensaje</th>
                <th>Usuario</th>
                <th>Componente</th>
                <th>Fuente</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows || '<tr><td colspan="6" class="text-center">No hay logs disponibles</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="mt-3">
          <small class="text-muted">
            Total de registros: ${logs.length} | Fuente: Backend
          </small>
        </div>
      `,
      width: '90%',
      showCloseButton: true,
      confirmButtonText: 'Cerrar',
      customClass: {
        htmlContainer: 'text-left'
      }
    });
  }

  private mostrarAuditoriaEnModal(records: AuditRecord[]): void {
    const tableRows = records.map(record => 
      `<tr>
        <td>${new Date(record.timestamp).toLocaleString()}</td>
        <td><span class="badge badge-info">${record.action}</span></td>
        <td>${record.table_name}</td>
        <td>${record.user_email}</td>
        <td>${record.record_id}</td>
      </tr>`
    ).join('');

    Swal.fire({
      title: 'Registros de Auditoría',
      html: `
        <div style="max-height: 500px; overflow-y: auto;">
          <table class="table table-striped table-sm">
            <thead class="thead-dark">
              <tr>
                <th>Fecha</th>
                <th>Acción</th>
                <th>Tabla</th>
                <th>Usuario</th>
                <th>Registro ID</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows || '<tr><td colspan="5" class="text-center">No hay registros disponibles</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="mt-3">
          <small class="text-muted">Total de registros: ${records.length}</small>
        </div>
      `,
      width: '80%',
      showCloseButton: true,
      confirmButtonText: 'Cerrar',
      customClass: {
        htmlContainer: 'text-left'
      }
    });
  }

  private getLogLevelClass(level: string): string {
    switch (level.toLowerCase()) {
      case 'error': return 'danger';
      case 'warn': 
      case 'warning': return 'warning';
      case 'info': return 'info';
      case 'debug': return 'secondary';
      default: return 'secondary';
    }
  }
} 