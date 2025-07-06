import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reserva-detalle',
  templateUrl: './reserva-detalle.component.html',
  styleUrls: ['./reserva-detalle.component.css']
})
export class ReservaDetalleComponent implements OnInit {
  reserva: any;
  showModal = false;
  showConfirmationMessage = false;
  showGoToCalendarButton = false;
  showFormularioButton = false; // Controla la visibilidad del botón "Cargar formulario"
  isLoading = true;  // Nueva bandera para controlar el estado de carga

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idReserva = this.route.snapshot.paramMap.get('id');
    if (idReserva) {
      this.getReservaDetalle(idReserva);
    }
  }

  getReservaDetalle(idReserva: string): void {
    const url = `${environment.apiUrl}/reservations/${idReserva}/details`;
    this.http.get<any>(url).subscribe(response => {
      this.reserva = response;

      console.log('Id: ', this.reserva.id_sesion);
      console.log(response);

      // Validamos que el responsable y nombre_local tengan valores
      if (!this.reserva.responsable) {
        this.reserva.responsable = 'Por definir'; // Si no hay responsable, asignamos un valor por defecto
      }

      if (!this.reserva.nombre_local) {
        this.reserva.nombre_local = 'No disponible'; // Si no hay nombre_local, asignamos un valor por defecto
      }

      // Aquí confirmamos que el estado de la reserva esté en 'formulario_pendiente' para mostrar el botón
      if (this.reserva.estado_reserva === 'formulario_pendiente') {
        this.showFormularioButton = true;
      } else {
        this.showFormularioButton = false;
      }

      // Cambiar el estado de carga una vez que la información esté lista
      this.isLoading = false;
    }, error => {
      console.error('Error al obtener los detalles de la reserva:', error);
      this.isLoading = false;  // Aseguramos que deje de cargarse en caso de error
    });
  }

  confirmarCancelacion(): void {
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  

  cancelarReserva(): void {
  const token = localStorage.getItem('auth_token');

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  // Determinar el endpoint correcto según el tipo de sesión
  let endpoint = `${environment.apiUrl}/reservations/${this.reserva.id_reserva}/cancel`;

  if (this.reserva.tipo_sesion === 'Virtual') {
    endpoint = `${environment.apiUrl}/reservations/${this.reserva.id_reserva}/cancel-virtual`;
  }

  

  this.http.patch(endpoint, {}, { headers }).subscribe(
    response => {
      this.showModal = false;
      this.showConfirmationMessage = true;
      this.showGoToCalendarButton = true;
    },
    error => {
      console.error('Error al cancelar la reserva:', error);
      this.showModal = false;

      if (error.error?.detail) {
        alert(`Error: ${error.error.detail}`);
      } else {
        alert('Ocurrió un error inesperado al cancelar la reserva.');
      }

      this.isLoading = false;
    }
  );
}


  goToCalendar(): void {
    this.router.navigate(['/user/mis-reservas']);
  }

  cargarFormulario(): void {
    const idReserva = this.reserva.id_sesion;
    console.log('Id: ', this.reserva.id_sesion);
    this.router.navigate([`/user/completar-formulario/${idReserva}`]);
  }
}
