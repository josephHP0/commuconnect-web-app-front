import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionesPorProfesionalService } from '../../services/sesiones-por-profesional.service';

@Component({
  selector: 'app-detalle-sesion-por-profesional',
  templateUrl: './detalle-sesion-por-profesional.component.html',
  styleUrls: ['./detalle-sesion-por-profesional.component.css']
})
export class DetalleSesionPorProfesionalComponent implements OnInit {

  idSesion!: number;
  sesion: any;
  idProfesional!: number;
 idServicio!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sesionService: SesionesPorProfesionalService
  ) {}

  ngOnInit(): void {
    this.idSesion = Number(this.route.snapshot.paramMap.get('id'));
     this.idProfesional = Number(this.route.snapshot.queryParamMap.get('idProfesional'));
      this.idServicio = Number(this.route.snapshot.queryParamMap.get('idServicio')); 
    this.obtenerSesion();
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

 

    volver() {
    this.router.navigate(
      ['/admin/lista-sesiones-por-profesionales', this.idProfesional],
      { queryParams: { idServicio: this.idServicio } }
    );
  }

}
