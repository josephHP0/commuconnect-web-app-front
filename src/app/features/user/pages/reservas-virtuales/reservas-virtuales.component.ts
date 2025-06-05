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

  // Horas y sesiones NO están disponibles por endpoints, los removemos por ahora
  // Si luego agregas endpoints para horas y sesiones, puedes volver a implementar

  sesionesDisponibles: any[] = [];
  cargandoSesiones = false;
  sesionSeleccionadaIndex: number | null = null;
  sinSesiones: boolean = false;

  idServicioSeleccionado!: number;

  constructor(private reservaService: ReservasVirtualesService, private route: ActivatedRoute) {}

  ngOnInit() {
    /*this.route.params.subscribe(params => {
      this.idServicioSeleccionado = +params['id_servicio'];
      this.reservaService.getProfesionales(this.idServicioSeleccionado).subscribe(data => {
        this.profesionales = data;
      });
    });*/
     // TEMPORAL: Hardcodeamos el ID del servicio (por ejemplo: 1)
    this.idServicioSeleccionado = 4; // HARDCODEADO

    this.reservaService.getProfesionales(this.idServicioSeleccionado).subscribe({
      next: (data) => {
        console.log('Profesionales cargados:', data);
        this.profesionales = data;
      },
      error: (err) => {
        console.error('Error cargando profesionales:', err);
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
  }


  retroceder() {
    this.step--;
  }

  resetFechas() {
    this.fechaSeleccionada = null;
    this.fechasDisponibles = [];
    this.step = 1;
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


  cargarFechas() {
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
  }


  seleccionarSesion(index: number) {
    this.sesionSeleccionadaIndex = index;
  }

  reservar() {
    if (this.sesionSeleccionadaIndex === null) {
      alert("Por favor selecciona una sesión.");
      return;
    }

    const sesion = this.fechasDisponibles[this.sesionSeleccionadaIndex];
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
