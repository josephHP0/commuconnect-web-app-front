import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-mis-reservaciones',
  templateUrl: './mis-reservaciones.component.html',
  styleUrls: ['./mis-reservaciones.component.css']
})
export class MisReservacionesComponent implements OnInit {
  currentDate = new Date();
  monthName = this.getMonthName(this.currentDate.getMonth());
  year = this.currentDate.getFullYear();
  daysInMonth: number[] = [];
  daysOfWeek: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  hours: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']; // Horas por día
  reservedSlots: any[] = []; // Array de objetos que contienen información de las reservas

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.generateDaysInMonth();
    this.loadReservations(); // Cargar las reservas al inicio
  }

  generateDaysInMonth(): void {
    const daysInMonth = new Date(this.year, this.currentDate.getMonth() + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.monthName = this.getMonthName(this.currentDate.getMonth());
    this.year = this.currentDate.getFullYear();
    this.generateDaysInMonth();
    this.loadReservations(); // Recargar las reservas después de cambiar de mes
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.monthName = this.getMonthName(this.currentDate.getMonth());
    this.year = this.currentDate.getFullYear();
    this.generateDaysInMonth();
    this.loadReservations(); // Recargar las reservas después de cambiar de mes
  }

  getMonthName(monthIndex: number): string {
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return monthNames[monthIndex];
  }

  loadReservations(): void {
    const idComunidad = 1; // Este ID debe ser dinámico o recibido desde otro componente
    const fecha = `${this.currentDate.getDate() < 10 ? '0' : ''}${this.currentDate.getDate()}/${this.currentDate.getMonth() + 1 < 10 ? '0' : ''}${this.currentDate.getMonth() + 1}/${this.currentDate.getFullYear()}`;

    // Cambiar la URL a la URL completa de tu backend
    this.http.get<any>(`http://localhost:8000/api/reservations/by-user-community?id_comunidad=${idComunidad}&fecha=${fecha}`).subscribe(
      response => {
        this.reservedSlots = this.parseReservedSlots(response);
      },
      error => {
        console.error('Error al cargar las reservas:', error);
      }
    );
  }

  parseReservedSlots(response: any): any[] {
    const reservedSlots: any[] = [];
    response.reservas.forEach((reserva: any) => {
      const reservationDate = new Date(reserva.hora_inicio);
      const day = reservationDate.getDate();
      const hour = reservationDate.getHours();
      reservedSlots.push({
        id_reserva: reserva.id_reserva,
        fecha: day,
        hora: `${hour < 10 ? '0' : ''}${hour}:00`,
        servicio: reserva.nombre_servicio // Agregamos el nombre del servicio para mostrarlo
      });
    });
    return reservedSlots;
  }

  getServiceForTime(day: string, hour: string): string {
    const reserved = this.reservedSlots.find(r => r.fecha === parseInt(day) && r.hora === hour);
    return reserved ? reserved.servicio : ''; // Retorna el servicio o vacío si no está reservado
  }

  isReservedForHour(day: string, hour: string): boolean {
    return this.reservedSlots.some(reserva => reserva.fecha === parseInt(day) && reserva.hora === hour);
  }

  isReserved(day: number): boolean {
    return this.reservedSlots.some(reserva => reserva.fecha === day);
  }

  selectDay(day: number): void {
    const reserva = this.reservedSlots.find(r => r.fecha === day);
    if (reserva) {
      this.router.navigate([`/mis-reservas/reserva-detalle/${reserva.id_reserva}`]);
    } else {
      console.log('No hay reserva para este día');
    }
  }
}
