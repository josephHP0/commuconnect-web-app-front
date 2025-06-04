import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {
  idServicio = 1; // <- puedes cambiar esto dinámicamente si lo pasas por queryParams
  distritos: any[] = [];
  localesFiltrados: any[] = [];

  distritoSeleccionado = '';
  localSeleccionado = '';

  fechasDisponibles: string[] = [
    '13/05/2025', '14/05/2025', '15/05/2025',
    '16/05/2025', '17/05/2025', '18/05/2025'
  ];
  fechasFiltradas: string[] = [];

  fechaInicioFiltro = '';
  fechaFinFiltro = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerDistritos();
    this.fechasFiltradas = [];
  }

  obtenerDistritos(): void {
    this.http.get<any[]>(`/api/services/usuario/servicio/${this.idServicio}/distritos`)
      .subscribe({
        next: (res) => {
          this.distritos = res;
          this.localesFiltrados = this.getLocalesRepresentativos(res);
        },
        error: (err) => console.error('Error al obtener distritos:', err)
      });
  }

  getLocalesRepresentativos(lista: any[]): any[] {
    const mapa = new Map<string, any>();
    lista.forEach(local => {
      if (!mapa.has(local.distrito)) {
        mapa.set(local.distrito, local);
      }
    });
    return Array.from(mapa.values());
  }

  filtrarPorDistrito(): void {
    this.localSeleccionado = '';
    this.fechaInicioFiltro = '';
    this.fechaFinFiltro = '';
    this.fechasFiltradas = [];

    if (!this.distritoSeleccionado) {
      this.localesFiltrados = this.getLocalesRepresentativos(this.distritos);
      return;
    }

    const distrito = encodeURIComponent(this.distritoSeleccionado);
    this.http.get<any[]>(`/api/services/usuario/servicio/${this.idServicio}/distrito/${distrito}/locales`)
      .subscribe({
        next: (res) => this.localesFiltrados = res,
        error: (err) => console.error('Error al obtener locales:', err)
      });
  }

  seleccionarLocal(local: any): void {
    this.localSeleccionado = local.nombre;
    this.fechasFiltradas = [...this.fechasDisponibles];
  }

  seleccionarLocalPorNombre(): void {
    const local = this.localesFiltrados.find(l => l.nombre === this.localSeleccionado);
    if (local) this.seleccionarLocal(local);
  }

  filtrarFechasPorRango(): void {
    if (!this.fechaInicioFiltro || !this.fechaFinFiltro) {
      this.fechasFiltradas = [...this.fechasDisponibles];
      return;
    }

    const inicio = new Date(this.fechaInicioFiltro);
    const fin = new Date(this.fechaFinFiltro);

    this.fechasFiltradas = this.fechasDisponibles.filter(fecha => {
      const actual = new Date(fecha.split('/').reverse().join('-'));
      return actual >= inicio && actual <= fin;
    });
  }

  continuar(): void {
    if (this.localSeleccionado) {
      console.log('Local seleccionado:', this.localSeleccionado);
      localStorage.setItem('local_seleccionado', this.localSeleccionado);
    }
  }
}
