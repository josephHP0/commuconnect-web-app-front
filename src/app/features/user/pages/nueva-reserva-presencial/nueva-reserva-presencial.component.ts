import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ReservasPresencialesService} from '../../services/reservas/reservas-presenciales.service'


@Component({
  selector: 'app-nueva-reserva-presencial',
  templateUrl: './nueva-reserva-presencial.component.html',
  styleUrls: ['./nueva-reserva-presencial.component.css']
})
export class NuevaReservaPresencialComponent {

  reservaConfirmada: any;



  constructor(private reservaService: ReservasPresencialesService, 
    private route: ActivatedRoute,
    private router: Router,
  ) {}


 

 

  ngOnInit(): void {
    const sesion = history.state.sesion;

   
    //console.log("prueba",idSesion)
    if (sesion && sesion.id_sesion) {
      this.reservaService.obtenerResumenReserva(sesion.id_sesion).subscribe({
        next: (data) => {
          // Adaptar si es necesario
          console.log('Datos de la reserva:', data);
          this.reservaConfirmada = {
            ...data,
            hora_inicio: this.combinarFechaYHora(data.fecha, data.hora_inicio),
            hora_fin: this.combinarFechaYHora(data.fecha, data.hora_fin)
          };
        },
        error: (err) => {
          console.error('Error al obtener resumen de reserva:', err);
        }
      });
    } else {
      console.error('No se recibió una sesión válida.');
    }

   
  }

  


  combinarFechaYHora(fecha: string, hora: string): Date {
    if (!fecha || !hora) return new Date('');
  
    // Convertir de "12/06/2025" → "2025-06-12"
    const [dia, mes, anio] = fecha.split('/');
    const fechaISO = `${anio}-${mes}-${dia}`;
  
    const horaCompleta = hora.trim().length === 5 ? hora.trim() + ':00' : hora.trim();
    const iso = `${fechaISO}T${horaCompleta}`;
  
    const date = new Date(iso);
  
    if (isNaN(date.getTime())) {
      console.error(`Fecha inválida generada: ${iso}`);
    }
  
    return date;
  }
  



  cancelarReserva() {
    this.router.navigate(['/user/seleccionar-servicio']); // o la ruta que corresponda
  }
  
  confirmarReserva() {
    if (this.reservaConfirmada && this.reservaConfirmada.id_sesion) {
      this.reservaService.crearReserva(this.reservaConfirmada.id_sesion).subscribe({
        next: (res) => {
          alert('Reserva realizada con éxito.');
          this.router.navigate(['/user/seleccionar-servicio']); // redirigir si deseas
        },
        error: (err) => {
          console.error('Error al confirmar reserva:', err);
          alert('Hubo un error al realizar la reserva.');
        }
      });
    }
  }
  


}
