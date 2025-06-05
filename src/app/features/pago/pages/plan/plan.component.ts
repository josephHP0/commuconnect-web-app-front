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
    //agrego para obtener el id_comunidad desde la ruta
     // Obtener id_comunidad de query params o route params
    this.route.queryParams.subscribe(params => {
      this.id_comunidad = +params['id_comunidad'] || 0;
    });

    // luego cargas los planes
    this.pagoService.getPlanes().subscribe({
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

  /*comprarPlan(id_plan: number, titulo: string, precio: number) {
  this.pagoService.seleccionarPlan(id_plan).subscribe({
    next: (respuesta) => {
      // Redirige a la pantalla de selección de pago con los datos del plan
      this.router.navigate(['/pago/selection'], {
        queryParams: {
          titulo,
          precio,
          id_plan
        }
      });
    },
    error: (error) => {
      console.error('Error al seleccionar el plan:', error);
      alert('Hubo un error al procesar el plan. Intenta nuevamente.');
    }
  });
}*/
  /*comprarPlan(id_plan: number, titulo: string, precio: number, id_comunidad: number) {
    this.pagoService.registrarInscripcion(id_comunidad, id_plan).subscribe({
      next: (respuesta) => {
        console.log('Inscripción registrada:', respuesta);
        // Redirige a la pantalla de selección de pago
        this.router.navigate(['/pago/selection'], {
          queryParams: {
            titulo,
            precio,
            id_plan,
            id_comunidad // para usarlo luego en el pago final
          }
        });
      },
      error: (error) => {
        console.error('Error al registrar inscripción:', error);
        alert('No se pudo registrar la inscripción.');
      }
    });
  }*/
 //esto queda antes
  /*comprarPlan(id_plan: number, titulo: string, precio: number, id_comunidad: number) {
    // 1. Crear pago pendiente llamando al endpoint correspondiente
    this.pagoService.seleccionarPlan(id_plan).subscribe({
    next: (respPagoPendiente) => {
      console.log('Pago pendiente creado:', respPagoPendiente);

      this.pagoService.registrarInscripcion(id_comunidad, id_plan, respPagoPendiente.id_pago).subscribe({
        next: (respInscripcion) => {
          console.log('Inscripción registrada:', respInscripcion);

          this.router.navigate(['/pago/selection'], {
            queryParams: {
              titulo,
              precio,
              id_plan,
              id_comunidad,
              id_pagoPendiente: respPagoPendiente.id_pago // <- Agregado
            }
          });
        },
        error: (error) => {
          console.error('Error al registrar inscripción:', error);
          alert('No se pudo registrar la inscripción.');
        }
      });
    },
    error: (error) => {
      console.error('Error al crear pago pendiente:', error);
      alert('No se pudo crear el pago pendiente.');
    }
  });

  }*/
  //probamos
  /*comprarPlan(id_plan: number, titulo: string, precio: number, id_comunidad: number) {
    // Llama al nuevo endpoint que gestiona la inscripción y el pago si es necesario
    this.pagoService.registrarInscripcion(id_comunidad, id_plan).subscribe({
      next: (respInscripcion) => {
        console.log('Inscripción registrada:', respInscripcion);

        this.router.navigate(['/pago/selection'], {
          queryParams: {
            titulo,
            precio,
            id_plan,
            id_comunidad,
            id_pagoPendiente: respInscripcion.id_pago // <- asumiendo que lo devuelve
          }
        });
      },
      error: (error) => {
        console.error('Error al registrar inscripción:', error);
        alert('No se pudo registrar la inscripción.');
      }
    });
  }*/
 //ahor asi ultimo
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






}
