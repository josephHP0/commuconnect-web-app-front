import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {
  idServicio = 1; // <- puedes cambiar esto dinámicamente si lo pasas por queryParams
  distritos: any[] = [];
  localesFiltrados: any[] = [];

  private readonly baseUrl = environment.apiUrl;
  distritoSeleccionado : any = null;
  localSeleccionado = '';

  fechasDisponibles: string[] = [
    '13/05/2025', '14/05/2025', '15/05/2025',
    '16/05/2025', '17/05/2025', '18/05/2025'
  ];
  fechasFiltradas: string[] = [];

  fechaInicioFiltro = '';
  fechaFinFiltro = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
     // Leer el servicioId desde query params
    this.route.queryParams.subscribe(params => {
      const id = params['servicioId'];
      if (id) {
        this.idServicio = +id; // convertir a número
      }
      this.obtenerDistritos();


      console.log("servicio que me dan "+this.idServicio);
    });

    this.fechasFiltradas = [];
  }

  obtenerDistritos(): void {
   // this.http.get<any[]>(`/api/services/usuario/servicio/${this.idServicio}/distritos`)
    //this.http.get<any[]>(`${this.baseUrl}/services/usuario/servicio/${this.idServicio}/distritos`)
    this.http.get<any[]>(`${this.baseUrl}/services/usuario/servicio/${this.idServicio}/distritos`)
    ///api/services/usuario/servicio/{id_servicio}/distritos
      .subscribe({
        next: (res) => {
          console.log('Respuesta de distritos:', res);
          this.distritos = res;
          this.localesFiltrados = this.getLocalesRepresentativos(res);
        },
        error: (err) => console.error('Error al obtener distritos:', err)
      });
  }

  getLocalesRepresentativos(lista: any[]): any[] {
    const mapa = new Map<string, any>();
    lista.forEach(local => {
      if (!mapa.has(local.nombre)) {
        mapa.set(local.nombre, local);
      }
    });
    return Array.from(mapa.values());
  }


/*
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
    this.http.get<any[]>(`${this.baseUrl}/services/usuario/servicio/10/distrito/${distrito}/locales`)

   // this.http.get<any[]>(`/services/usuario/servicio/${this.idServicio}/distrito/${distrito}/locales`)
      .subscribe({
        next: (res) => this.localesFiltrados = res,
        error: (err) => console.error('Error al obtener locales:', err)
      });
  }
*/



filtrarPorDistrito(): void {
  this.localSeleccionado = '';
  this.fechaInicioFiltro = '';
  this.fechaFinFiltro = '';
  this.fechasFiltradas = [];

  if (!this.distritoSeleccionado) {
    this.localesFiltrados = this.getLocalesRepresentativos(this.distritos);
    return;
  }
const distritoId = this.distritoSeleccionado.id_distrito; // o el nombre del campo id que tengas
  console.log("distrito seleccionado ojo"+distritoId)
this.http.get<any[]>(`${this.baseUrl}/services/servicio/${this.idServicio}/distrito/${distritoId}/locales`)
//127.0.0.1:8000/api/services/servicio/10%7D/distrito/undefined/locales:1


           //Failed to load resource: the server responded with a status of 422 (Unprocessable Content)

  //const distritoNombre = encodeURIComponent(this.distritoSeleccionado.nombre); // ✅ usa nombre o id_distrito
  //this.http.get<any[]>(`${this.baseUrl}/services/usuario/servicio/10/distrito/${distritoId}/locales`)

    .subscribe({
    next: (res) => {
        console.log('Respuesta de locales filtrados:', res); // 👈 aquí lo agregas
        this.localesFiltrados = res;
      },
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
