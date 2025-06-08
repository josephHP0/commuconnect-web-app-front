import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {
  idServicio = 1;

  // Nivel 1
  distritos: any[] = [];
  distritoSeleccionado: any = null;

  // Nivel 2
  localesFiltrados: any[] = [];
  localSeleccionado: any = null;

  // Nivel 3
  fechasFiltradas: string[] = [];
  fechaSeleccionada = '';

  // Nivel 4
  horasFiltradas: string[] = [];
  horaSeleccionada = '';

  // Nivel 5
  sesionesDisponibles: any[] = [];

  private readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['servicioId']) {
        this.idServicio = +params['servicioId'];
      }
      this.obtenerDistritos();
    });
  }

  // ─── Nivel 1: Distritos ───────────────────────────────────────────
  obtenerDistritos(): void {
    this.http
      .get<any[]>(`${this.baseUrl}/services/usuario/servicio/${this.idServicio}/distritos`)
      .subscribe({
        next: res => {
          this.distritos = res;
          this.localesFiltrados = this.getLocalesRepresentativos(res);
        },
        error: err => console.error('Error al obtener distritos:', err)
      });
  }

  private getLocalesRepresentativos(lista: any[]): any[] {
    const mapa = new Map<string, any>();
    lista.forEach(item => {
      if (!mapa.has(item.nombre)) {
        mapa.set(item.nombre, item);
      }
    });
    return Array.from(mapa.values());
  }

  filtrarPorDistrito(): void {
    this.localSeleccionado = null;
    this.resetFechasHorasSesiones();

    if (!this.distritoSeleccionado) {
      this.localesFiltrados = this.getLocalesRepresentativos(this.distritos);
      return;
    }

    const distritoId = this.distritoSeleccionado.id_distrito;
    this.http
      .get<any[]>(`${this.baseUrl}/services/servicio/${this.idServicio}/distrito/${distritoId}/locales`)
      .subscribe({
        next: res => this.localesFiltrados = res,
        error: err => console.error('Error al obtener locales:', err)
      });
  }

  // ─── Nivel 2: Locales ─────────────────────────────────────────────
  seleccionarLocal(local: any): void {
    this.localSeleccionado = local;
    this.resetFechasHorasSesiones();
    this.obtenerFechasPresenciales();
  }

  // ─── Nivel 3: Fechas ──────────────────────────────────────────────
  private obtenerFechasPresenciales(): void {
    const params = new HttpParams()
      .set('id_servicio', this.idServicio.toString())
      .set('id_distrito', this.distritoSeleccionado.id_distrito)
      .set('id_local', this.localSeleccionado.id_local);

    this.http
      .get<{ fechas: string[] }>(`${this.baseUrl}/reservations/fechas-presenciales`, { params })
      .subscribe({
        next: res => this.fechasFiltradas = res.fechas,
        error: err => console.error('Error al obtener fechas:', err)
      });
  }

  seleccionarFecha(fecha: string): void {
    this.fechaSeleccionada = fecha;
    this.horasFiltradas = [];
    this.horaSeleccionada = '';
    this.sesionesDisponibles = [];
    this.obtenerHorasPresenciales();
  }

  // ─── Nivel 4: Horas ───────────────────────────────────────────────
  private obtenerHorasPresenciales(): void {
    const params = new HttpParams()
      .set('id_servicio', this.idServicio.toString())
      .set('id_distrito', this.distritoSeleccionado.id_distrito)
      .set('id_local', this.localSeleccionado.id_local)
      .set('fecha', this.fechaSeleccionada);  // << aquí sin transformar

    this.http
      .get<{ horas: string[] }>(`${this.baseUrl}/reservations/horas-presenciales`, { params })
      .subscribe({
        next: res => this.horasFiltradas = res.horas,
        error: err => console.error('Error al obtener horas:', err)
      });
  }

  seleccionarHora(hora: string): void {
    this.horaSeleccionada = hora;
    this.sesionesDisponibles = [];
    this.obtenerSesionesPresenciales();
  }

  // ─── Nivel 5: Sesiones ────────────────────────────────────────────
  private obtenerSesionesPresenciales(): void {
    const params = new HttpParams()
      .set('id_servicio', this.idServicio.toString())
      .set('id_distrito', this.distritoSeleccionado.id_distrito)
      .set('id_local', this.localSeleccionado.id_local)
      .set('fecha', this.fechaSeleccionada)   // << fecha en DD/MM/YYYY
      .set('hora', this.horaSeleccionada);

    this.http
      .get<{ sesiones: any[] }>(`${this.baseUrl}/reservations/sesiones-presenciales`, { params })
      .subscribe({
        next: res => this.sesionesDisponibles = res.sesiones,
        error: err => console.error('Error al obtener sesiones:', err)
      });
  }

  reservarSesion(sesion: any): void {
    this.http
      .get<string>(`${this.baseUrl}/reservations/reserva-existe/${sesion.id_sesion}`)
      .subscribe({
        next: res => {
          if (res === 'true') {
            alert('Ya existe una reserva para esta sesión.');
          } else {
            alert('Puedes proceder a reservar esta sesión.');
          }
        },
        error: err => console.error('Error al verificar reserva:', err)
      });
  }

  private resetFechasHorasSesiones(): void {
    this.fechasFiltradas = [];
    this.fechaSeleccionada = '';
    this.horasFiltradas = [];
    this.horaSeleccionada = '';
    this.sesionesDisponibles = [];
  }
}
