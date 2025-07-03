import { Component } from '@angular/core';
import { SesionesPorLocalService } from '../../services/sesiones-por-local.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-detalle-sesion-por-local',
  templateUrl: './detalle-sesion-por-local.component.html',
  styleUrls: ['./detalle-sesion-por-local.component.css']
})
export class DetalleSesionPorLocalComponent {




    constructor(
      private route: ActivatedRoute,
      private sesionesService: SesionesPorLocalService,
      private router: Router
    ) {}





  volver() {
/*
    this.router.navigate(
      ['/admin/lista-sesiones-por-local', this.idProfesional],
      { queryParams: { idServicio: this.idServicio } }
    );
*/
  }

}
