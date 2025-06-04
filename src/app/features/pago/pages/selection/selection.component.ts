import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  //
  id_comunidad: number = 0;
  id_pagoPendiente: number = 0; // Agregado para manejar el pago pendiente

  constructor(private route: ActivatedRoute,private router: Router, private pagoService: PagoService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.planSeleccionado = params['titulo'];
      this.precioSeleccionado = params['precio'];
      this.id_plan = +params['id_plan'];
      //
      this.id_comunidad = +params['id_comunidad'] || 0; 
      this.id_pagoPendiente = +params['id_pagoPendiente'] || 0;
    });
  }

  /*confirmarSeleccion() {
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
  }*/
 //esto agrego
 /*confirmarSeleccion() {
    this.pagoService.registrarInscripcion(this.id_comunidad, this.id_plan).subscribe({
      next: (resInscripcion) => {
        console.log('Inscripción registrada:', resInscripcion);

        // Luego de inscribirte, llama a pagar
        this.pagoService.pagarComunidad(this.id_comunidad).subscribe({
          next: (resPago) => {
            console.log('Pago exitoso:', resPago);
            // Redirige a pantalla de confirmación o agradecimiento
            this.router.navigate(['/pago/confirmacion']);
          },
          error: (error) => {
            console.error('Error al realizar el pago:', error);
            alert('Error al realizar el pago.');
          }
        });
      },
      error: (error) => {
        console.error('Error al registrar inscripción:', error);
        alert('Error al registrar la inscripción.');
      }
    });
  }*/
 /*confirmarSeleccion() {
  console.log('Comunidad:', this.id_comunidad);

  this.pagoService.pagarComunidad(this.id_comunidad).subscribe({
    next: (resPago) => {
      console.log('Pago exitoso:', resPago);
      // Redirige a pantalla de confirmación o agradecimiento
      this.router.navigate(['/pago/confirmacion']);
    },
    error: (error) => {
      console.error('Error al realizar el pago:', error);
      alert(error.error?.detail || 'Error al realizar el pago.');
    }
  });
}*/

 /*realizarPago() {
    this.pagoService.pagarComunidad(this.id_comunidad).subscribe({
      next: (respuesta) => {
        console.log('Pago realizado:', respuesta);
        // Redirigir o mostrar confirmación de pago
      },
      error: (error) => {
        console.error('Error al pagar:', error);
        alert('No se pudo realizar el pago.');
      }
    });
  }*/
  //ult
  confirmarSeleccion() {
  if (!this.id_pagoPendiente) {
    alert('No hay pago pendiente para realizar.');
    return;
  }
  this.pagoService.pagarComunidad(this.id_comunidad).subscribe({
    next: res => {
      alert('Pago realizado con éxito');
      this.router.navigate(['/pago/confirmacion']);
    },
    error: err => {
      alert(err.error?.detail || 'Error al realizar el pago');
    }
  });
}
}