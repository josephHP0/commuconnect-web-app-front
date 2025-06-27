import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunidadxplanCreateService, ComunidadXPlanCreate } from '../../services/comunidadxplan-create.service';
import { PlanPorComunidad } from '../../services/membresiaxcomunidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comunidadxplan-create',
  templateUrl: './comunidadxplan-create.component.html',
  styleUrls: ['./comunidadxplan-create.component.css']
})
export class ComunidadxplanCreateComponent implements OnInit {
  idComunidad: number = 0;
  nuevoPlan = {
    titulo: '',
    duracion: 1,
    topes: null,
    precio: 0
  };

  constructor(
    private servicio: ComunidadxplanCreateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idComunidad = Number(params['id_comunidad']) || 0;
    });
  }

  agregar(): void {
    const data: ComunidadXPlanCreate = {
      id_comunidad: this.idComunidad,
      ...this.nuevoPlan
    };
    console.log('Enviando a FastAPI:', data);
    this.servicio.agregarPlanAComunidad(data).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Plan agregado correctamente', 'success');
        this.router.navigate(['/membresiaxcomunidad']);
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo agregar el plan', 'error');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/membresiaxcomunidad']);
  }
}