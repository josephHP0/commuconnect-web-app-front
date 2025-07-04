import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reserva-detalle',
  templateUrl: './reserva-detalle.component.html',
  styleUrls: ['./reserva-detalle.component.css']
})
export class ReservaDetalleComponent implements OnInit {
  reserva: any;
  showModal = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el id de la reserva desde la URL
    const idReserva = this.route.snapshot.paramMap.get('id');
    
    if (idReserva) {
      this.getReservaDetalle(idReserva);
    }
  }

  getReservaDetalle(idReserva: string): void {
    // Llamar al endpoint para obtener los detalles de la reserva
    this.http.get<any>(`/api/reservations/${idReserva}/details`).subscribe(response => {
      this.reserva = response;
    }, error => {
      console.error('Error al obtener los detalles de la reserva:', error);
    });
  }

  // Mostrar el modal de confirmación
  confirmarCancelacion(): void {
    this.showModal = true;
  }

  // Cerrar el modal
  cerrarModal(): void {
    this.showModal = false;
  }

  // Cancelar la reserva
  cancelarReserva(): void {
    this.http.patch(`/api/reservations/${this.reserva.id_reserva}/cancel`, {}).subscribe(
      response => {
        alert('Reserva Cancelada');
        this.router.navigate(['/mis-reservas']); // Redirigir al calendario
      },
      error => {
        console.error('Error al cancelar la reserva:', error);
      }
    );
  }
}
