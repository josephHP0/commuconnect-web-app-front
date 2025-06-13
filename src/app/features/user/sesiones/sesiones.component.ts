import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { ActivatedRoute ,Router} from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {

  idServicio = 1;
  paginaActual = 1;
  sesionSeleccionada: any = null;
  step = 1;

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
    private route: ActivatedRoute,
    private router: Router
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
    console.log("seleccion",this.localSeleccionado)
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



  private obtenerSesionesPresenciales(): void {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');
  
    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`
    });
  
    const params = new HttpParams()
      .set('id_servicio', this.idServicio.toString())
      .set('id_distrito', this.distritoSeleccionado.id_distrito)
      .set('id_local', this.localSeleccionado.id_local)
      .set('fecha', this.fechaSeleccionada) // formato DD/MM/YYYY
      .set('hora', this.horaSeleccionada);
  
    this.http
      .get<{ sesiones: any[] }>(
        `${this.baseUrl}/reservations/sesiones-presenciales`,
        { headers, params }
      )
      .subscribe({
        next: res => this.sesionesDisponibles = res.sesiones,
        error: err => console.error('Error al obtener sesiones:', err)
      });
  }
  

  reservarSesion(sesion: any): void {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');
  
    if (!tokenType || !accessToken) {
      console.error('Token de autenticación no encontrado.');
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }
  
    const headers = new HttpHeaders().set('Authorization', `${tokenType} ${accessToken}`);
  
    this.http
      .get<string>(`${this.baseUrl}/reservations/reserva-existe/${sesion.id_sesion}`, { headers })
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




  retroceder(): void {
    if (this.step > 1) {
      this.step = 1;
      this.resetFechasHorasSesiones();  // Limpia la selección al volver
    }
  }
  

  continuar(): void {
    if (this.step === 1) {
      if (!this.distritoSeleccionado || !this.localSeleccionado) {
        alert('Por favor selecciona un distrito y un local.');
        return;
      }
  
      // Al pasar a la etapa 2, ya puedes obtener las fechas disponibles
      this.obtenerFechasPresenciales();
      this.step = 2;
    }
  }
  

  seleccionarSesion(sesion: any): void {
    if (this.sesionSeleccionada === sesion) {
      // Deseleccionar si ya estaba seleccionada
      this.sesionSeleccionada = null;
    } else {
      this.sesionSeleccionada = sesion;
    }
  }

  volverAServiciosTipo() {
    this.router.navigate(['/user/seleccionar-servicio']);
  }


  continuarReserva(): void {
    if (this.sesionSeleccionada) {
      // Lógica para continuar a la siguiente etapa
      console.log('Sesión seleccionada:', this.sesionSeleccionada);
      // Puedes navegar a otro componente o mostrar un resumen, etc.
      //this.router.navigate(['/user/resumen-reserva']); // Ejemplo de ruta
    }
  }
  
  


}
