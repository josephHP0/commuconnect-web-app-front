import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagoService } from '../../pago.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {
  planSeleccionado: string = '';
  precioSeleccionado: string = '';
  id_plan: number = 0;


  constructor(private route: ActivatedRoute, private pagoService: PagoService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.planSeleccionado = params['titulo'];
      this.precioSeleccionado = params['precio'];
      this.id_plan = +params['id_plan'];
    });
  }

  confirmarSeleccion() {
    const token = localStorage.getItem('token') || '';

    this.pagoService.confirmarPago(this.id_plan, token).subscribe({
      next: res => {
        alert('Pago realizado con éxito');
        // Aquí redireccionar o limpiar si quieres
      },
      error: err => {
        alert('Error al realizar el pago');
      }
    });
  }
}