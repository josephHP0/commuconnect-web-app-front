import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Para redireccionar al usuario
import { Plan,  PagoService } from '../../pago.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit{
  planes: Plan[] = [];
  planesPremium: Plan[] = [];
  planesTopes: Plan[] = [];

  //agrego para inscripción
  id_comunidad: number = 0;  


  constructor(
    private pagoService: PagoService,
    private router: Router, // Para redirigir al usuario luego del registro
    private route: ActivatedRoute // Para obtener parámetros de la ruta actual
  ) {}

  ngOnInit(): void {
    // Obtener id_comunidad desde localStorage
    const storedId = localStorage.getItem('id_comunidad');
    this.id_comunidad = storedId ? +storedId : 0;

    // luego cargas los planes
    this.pagoService.getPlanesPorComunidad(this.id_comunidad).subscribe({
      next: (data) => {
        console.log('Planes recibidos:', data);
        this.planes = data;
        this.planesPremium = this.planes.filter(p => Number(p.topes) === 0);
        this.planesTopes = this.planes.filter(p => Number(p.topes) > 0);
      },
      error: (error) => {
        console.error('Error cargando los planes', error);
      }
    });
  }
  


  irAOtraPagina() {
      this.router.navigate(['/presentacion/comunidades']);
    }
 comprarPlan(id_plan: number, titulo: string, precio: number, id_comunidad: number) {
  this.pagoService.registrarInscripcion(id_comunidad, id_plan).subscribe({
    next: (respInscripcion) => {
      console.log('Inscripción registrada:', respInscripcion);

      // el id_pago que viene dentro del objeto respInscripcion
      const id_pago = respInscripcion.id_pago;

      if (!id_pago) {
        alert('No se pudo obtener el pago pendiente.');
        return;
      }

      // Navegas a la página de selección de pago pasando los datos necesarios como queryParams
      this.router.navigate(['/pago/selection'], {
        queryParams: {
          titulo,
          precio,
          id_plan,
          id_comunidad,
          id_pagoPendiente: id_pago
        }
      });
    },
    error: (error) => {
      console.error('Error al registrar inscripción:', error);
      alert('No se pudo registrar la inscripción.');
    }
  });
  
}
  cerrarSesion() {
    // Elimina cualquier dato de sesión que hayas almacenado
    localStorage.clear(); // O sessionStorage.clear(), dependiendo de cómo lo manejes
    //localStorage.removeItem('token');

    // Redirige a la página de presentación
    this.router.navigate(['/presentacion/inicio']);
  }






}
