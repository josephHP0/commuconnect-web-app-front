import { Component } from '@angular/core';

import { ReservasVirtualesService } from '../../services/reservas/reservas-virtuales.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-nueva-reserva-virtual',
  templateUrl: './nueva-reserva-virtual.component.html',
  styleUrls: ['./nueva-reserva-virtual.component.css']
})
export class NuevaReservaVirtualComponent {


  reservaConfirmada: any;

  mostrarModal = false;
  datosReserva: any = null;

  checkboxLeido: boolean = false;

  idComunidad!: number;

  constructor(private reservaService: ReservasVirtualesService, private route: ActivatedRoute,private router: Router) {}


  ngOnInit() {
    const sesion = history.state.sesion;

    console.log("La sesion esta en nueva reserva",sesion)


    const comunidadGuardada = localStorage.getItem('comunidad_seleccionada');
    if (comunidadGuardada) {
      const comunidad = JSON.parse(comunidadGuardada);
      this.idComunidad = comunidad.id_comunidad;
      console.log("se guardo la comunidad ahora:",this.idComunidad);
    }
  
    if (!sesion) {
      alert("⚠️ Tu sesión ha expirado o la información ya no está disponible. Por favor selecciona nuevamente la sesión.");
      this.router.navigate(['/reservas-virtuales']);
      return;
    }
  
    this.reservaConfirmada = sesion;
  }


  cancelarReserva() {
    this.router.navigate(['/user/seleccionar-servicio']); // o la ruta que corresponda
  }

  mostrarModalConfirmacion(reserva: any) {
    this.datosReserva = reserva;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.router.navigate(['/user/seleccionar-servicio']);
  }
  
  irAInicio() {
    this.mostrarModal = false;
    this.router.navigate(['/user/seleccionar-servicio']);
  }
  
  confirmarReserva() {
    if (this.reservaConfirmada && this.reservaConfirmada.id_sesion && this.idComunidad) {
      this.reservaService.crearReserva(this.reservaConfirmada.id_sesion,this.idComunidad).subscribe({
        next: (res) => {
          //alert('Reserva realizada con éxito.');
          //this.router.navigate(['/user/seleccionar-servicio']); // redirigir si deseas

          this.mostrarModalConfirmacion(res);
        },
        error: (err) => {
          console.error('Error al confirmar reserva:', err);
          alert('Hubo un error al realizar la reserva.');
          this.router.navigate(['/user/seleccionar-servicio']);
        }
      });
    }
  }




}
