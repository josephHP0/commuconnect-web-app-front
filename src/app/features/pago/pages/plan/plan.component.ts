import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Para redireccionar al usuario
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



  constructor(
    private pagoService: PagoService,
    private router: Router // Para redirigir al usuario luego del registro
  ) {}

  ngOnInit(): void {
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

  comprarPlan(id_plan: number, titulo: string, precio: number) {
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
}

}
