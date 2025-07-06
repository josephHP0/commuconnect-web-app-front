import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial-pagos',
  templateUrl: './historial-pagos.component.html',
  styleUrls: ['./historial-pagos.component.css']
})
export class HistorialPagosComponent implements OnInit {
  pagos: any[] = [];
  pagosFiltrados: any[] = [];
  detallePago: any = null;
  filtroTexto: string = '';
  mostrarFiltro: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/api/billing/usuario/inscripciones').subscribe(data => {
      this.pagos = data;
      this.pagosFiltrados = [...this.pagos];
    });
  }

  abrirModal(id: number): void {
    this.http.get(`/api/billing/inscripcion/${id}/detalle`).subscribe((detalle: any) => {
      console.log('DETALLE:', detalle);
      this.detallePago = detalle;
    });
  }


  cerrarModal(): void {
    this.detallePago = null;
  }

  toggleFiltro(): void {
    this.mostrarFiltro = !this.mostrarFiltro;
  }

  ordenar(tipo: string): void {
    switch (tipo) {
      case 'reciente':
        this.pagosFiltrados.sort((a, b) => new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime());
        break;
      case 'antiguo':
        this.pagosFiltrados.sort((a, b) => new Date(a.fecha_inicio).getTime() - new Date(b.fecha_inicio).getTime());
        break;
      case 'mayor':
        this.pagosFiltrados.sort((a, b) => b.precio - a.precio);
        break;
      case 'menor':
        this.pagosFiltrados.sort((a, b) => a.precio - b.precio);
        break;
    }
    this.mostrarFiltro = false;
  }

  filtrarPagos(): void {
    const texto = this.filtroTexto.toLowerCase();
    this.pagosFiltrados = this.pagos.filter(p => 
      p.titulo_plan.toLowerCase().includes(texto) || 
      p.fecha_inicio.includes(texto)
    );
  }
}
