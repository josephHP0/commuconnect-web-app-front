import { Component, OnInit } from '@angular/core';
import { ReservasVirtualesService, FechaSesion } from '../../services/reservas/reservas-virtuales.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservas-virtuales',
  templateUrl: './reservas-virtuales.component.html',
  styleUrls: ['./reservas-virtuales.component.css']
})
export class ReservasVirtualesComponent implements OnInit {
  step = 1;

  profesionales: any[] = [];
  profesionalSeleccionado: number | null = null;


  fechasDisponibles: FechaSesion[] = [];
  fechaSeleccionada: string | null = null;
  cargandoFechas = false;

  fechasMapeadas: { [key: string]: FechaSesion[] } = {};
  horasDisponibles: FechaSesion[] = [];
  horaSeleccionada: FechaSesion | null = null;

  // Horas y sesiones NO están disponibles por endpoints, los removemos por ahora
  // Si luego agregas endpoints para horas y sesiones, puedes volver a implementar
  cargandoReserva: boolean = false;
  vacantesLibres: number = 0;
  reservaExistente: boolean = false;

  sesionesDisponibles: any[] = [];
  cargandoSesiones = false;
  sesionSeleccionadaIndex: number | null = null;
  sinSesiones: boolean = false;

  idServicioSeleccionado!: number;
  id_comunidad: number = 0;
  topesEstado: string | null = null;

  constructor(private reservaService: ReservasVirtualesService, private route: ActivatedRoute) {}
/*
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

*/


idServicio=1;


  ngOnInit() {
    // Recuperar id_comunidad desde localStorage
    const storedId = localStorage.getItem('id_comunidad');
    this.id_comunidad = storedId ? +storedId : 0;

    // Hardcodeas idServicio por ahora
    this.idServicioSeleccionado = 4;

  this.route.queryParams.subscribe(params => {
      const id = params['servicioId'];
      if (id) {
        this.idServicio = +id; // convertir a número

      }

       this.reservaService.getProfesionales(this.idServicioSeleccionado).subscribe({
      next: (data) => {
        console.log('Profesionales cargados:', data);
        this.profesionales = data;
      },
      error: (err) => {
        console.error('Error cargando profesionales:', err);
      }
    });




    });








    this.reservaService.getTopes(this.id_comunidad).subscribe({
      next: (topes) => {
        if (topes.estado === 'Ilimitado') {
          this.topesEstado = '¡Reservas ilimitadas!';
        } else {
          this.topesEstado = `Reservas disponibles: ${topes.topes_disponibles}`;
        }
      },
      error: (err) => {
        console.error('Error obteniendo topes:', err);
        this.topesEstado = null;
      }
    });
  }


  continuar() {
    if (this.step === 1) {
      if (this.profesionalSeleccionado == null) {
        alert("Por favor selecciona un profesional.");
        return;
      }
      this.cargarFechas();
    }

    // Solo avanzamos si no estamos en el último paso
    if (this.step < 3) {
      this.step++;
    }
    if (this.step === 2 && this.fechaSeleccionada && this.horaSeleccionada) {
      this.cargarSesionesDisponibles();
    }

  }


  retroceder() {
    this.step--;
  }

  resetFechas() {
    this.fechaSeleccionada = null;
    this.fechasDisponibles = [];
    this.step = 1;
  }
  seleccionarProfesional(profesional: any) {
    this.profesionalSeleccionado = profesional.id_profesional;
    this.onProfesionalSeleccionado();
  }

  onProfesionalSeleccionado() {
    this.resetFechas();
  }

  nombreProfesional(): string {
    const id = this.profesionalSeleccionado;
    if (id == null) return '';

    const profesional = this.profesionales.find(p => p.id_profesional === +id);
    return profesional?.nombre_completo ?? '';
  }


  /*cargarFechas() {
    if (this.profesionalSeleccionado == null) return;

    this.cargandoFechas = true;
    this.reservaService.getFechasDisponibles(this.profesionalSeleccionado).subscribe({
      next: fechas => {
        this.fechasDisponibles = fechas;
        this.cargandoFechas = false;
      },
      error: err => {
        console.error('Error al cargar fechas:', err);
        this.cargandoFechas = false;
      }
    });
  }*/
  cargarFechas() {
    if (this.profesionalSeleccionado == null) return;

    this.cargandoFechas = true;
    this.reservaService.getFechasDisponibles(this.profesionalSeleccionado).subscribe({
      next: fechas => {
        this.fechasDisponibles = fechas;

        // Agrupar por fecha
        this.fechasMapeadas = fechas.reduce((acc, f) => {
          if (!f.dia) return acc;
          if (!acc[f.dia]) acc[f.dia] = [];
          acc[f.dia].push(f);
          return acc;
        }, {} as { [key: string]: FechaSesion[] });

        this.cargandoFechas = false;
      },
      error: err => {
        console.error('Error al cargar fechas:', err);
        this.cargandoFechas = false;
      }
    });
  }
  onFechaSeleccionada(fecha: string | null) {
    if (!fecha) return;

    this.fechaSeleccionada = fecha;
    this.horasDisponibles = this.fechasMapeadas[fecha] || [];
    this.horaSeleccionada = null;
  }
  cargarSesionesDisponibles() {
    this.cargandoSesiones = true;
    this.sinSesiones = false;
    this.sesionSeleccionadaIndex = null;
    this.vacantesLibres = 0; // Reset

    const sesiones = this.horasDisponibles.filter(h => h.hora === this.horaSeleccionada?.hora);
    const promesas = sesiones.map(async (sesion) => {
      const existe = await this.reservaService.verificarReservaExiste(sesion.id_sesion!).toPromise();
      return {
        ...sesion,
        vacantes_libres: existe ? 0 : 1,
        existeReserva: existe
      };
    });

    Promise.all(promesas).then(sesionesConVacantes => {
      this.sesionesDisponibles = sesionesConVacantes;

      // Actualizar contadores globales
      const vacantes = sesionesConVacantes.filter(s => s.vacantes_libres > 0).length;
      const algunaReservaExiste = sesionesConVacantes.some(s => s.existeReserva);

      this.vacantesLibres = vacantes;
      this.reservaExistente = algunaReservaExiste;

      this.cargandoSesiones = false;
      this.sinSesiones = this.sesionesDisponibles.length === 0;
    }).catch(err => {
      console.error('Error cargando sesiones:', err);
      this.cargandoSesiones = false;
      this.sinSesiones = true;
    });
  }




  seleccionarSesion(index: number) {
    this.sesionSeleccionadaIndex = index;
  }

  reservar() {
    if (this.sesionSeleccionadaIndex === null) {
      alert("Por favor selecciona una sesión.");
      return;
    }

    //const sesion = this.fechasDisponibles[this.sesionSeleccionadaIndex];
    const sesion = this.sesionesDisponibles[this.sesionSeleccionadaIndex];

    if (!sesion || !sesion.id_sesion_virtual) {
      alert("Sesión inválida.");
      return;
    }

    this.reservaService.verificarReservaExiste(sesion.id_sesion_virtual).subscribe(existe => {
      if (existe) {
        alert("Ya tienes una reserva activa para esta sesión.");
      } else {
        console.log('Reservando sesión:', sesion);
        // Aquí podrías llamar al endpoint para reservar (si lo implementas)
      }
    }, error => {
      console.error('Error verificando reserva', error);
      alert("Error al verificar la reserva. Intenta nuevamente.");
    });
  }
}
