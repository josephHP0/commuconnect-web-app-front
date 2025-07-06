import { Component } from '@angular/core';
import { SesionesPorLocalService } from '../../services/sesiones-por-local.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-detalle-sesion-por-local',
  templateUrl: './detalle-sesion-por-local.component.html',
  styleUrls: ['./detalle-sesion-por-local.component.css']
})
export class DetalleSesionPorLocalComponent {
  idSesion!: number;
  sesion: any;
  idLocal!: number;
 idServicio!: number;



    constructor(
      private route: ActivatedRoute,
      private sesionService: SesionesPorLocalService,
      private router: Router
    ) {}


 ngOnInit(): void {
    this.idSesion = Number(this.route.snapshot.paramMap.get('id'));
     this.idLocal = Number(this.route.snapshot.queryParamMap.get('idLocal'));
      this.idServicio = Number(this.route.snapshot.queryParamMap.get('idServicio')); 
    this.obtenerSesion();
  }


  volver() {

    this.router.navigate(
      ['/admin/lista-sesiones-por-local', this.idLocal],
      { queryParams: { idServicio: this.idServicio } }
    );

  }


   obtenerSesion() {
    this.sesionService.obtenerDetalleSesion(this.idSesion).subscribe(
      (data) => {
        this.sesion = data;
        console.log(this.sesion);
      },
      (error) => {
        console.error('Error al obtener sesión', error);
      }
    );
  }

}
