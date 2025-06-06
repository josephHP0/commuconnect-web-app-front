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
  id_comunidad: number = 0;
  topesEstado: string | null = null;
  constructor(private reservaService: ReservasVirtualesService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Recuperar id_comunidad desde localStorage
    const storedId = localStorage.getItem('id_comunidad');
    this.id_comunidad = storedId ? +storedId : 0;

    // Hardcodeas idServicio por ahora
    this.idServicioSeleccionado = 4;

    this.reservaService.getProfesionales(this.idServicioSeleccionado).subscribe({
      next: (data) => {
        console.log('Profesionales cargados:', data);
        this.profesionales = data;
      },
      error: (err) => {
        console.error('Error cargando profesionales:', err);
      }
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
