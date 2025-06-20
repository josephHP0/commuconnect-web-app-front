import { Component } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ServiciosPorComunidadService } from '../../services/servicios-por-comunidad.service';

@Component({
  selector: 'app-servicios-por-comunidad',
  templateUrl: './servicios-por-comunidad.component.html',
  styleUrls: ['./servicios-por-comunidad.component.css']
})
export class ServiciosPorComunidadComponent {



  idComunidad: number | null = null;

  comunidad = {
    nombre: '',
    slogan: '',
    imagen:''

  };

  imagenURL: string | ArrayBuffer | null = null;

  servicios: any[] = [];


  constructor(
    private readonly serviciosPorComunidadService: ServiciosPorComunidadService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idComunidad = Number(this.route.snapshot.paramMap.get('id'));

    this.generarServiciosPorComunidadSeleccionada(this.idComunidad);

  }

  generarServiciosPorComunidadSeleccionada(id:number){

    if (id) {
      this.serviciosPorComunidadService.obtenerServiciosPorComunidad(id)
      .subscribe({
        next: (data) => {
          console.log('Servicios recibidos:', data);
          this.servicios = data.servicios;  // ← Aquí el cambio importante

          this.comunidad.nombre = data.nombre;
          

        },
        error: (err) => console.error('Error al cargar servicios', err)
      });
    }




  }

  eliminarServicioEnComunidad(idServicio:number): void {
    if (confirm('¿Estás seguro de eliminar este servicio de la comunidad?')&&idServicio&&this.idComunidad) {
    
      console.log(idServicio,"  ",this.idComunidad)
      

      this.serviciosPorComunidadService.eliminarServicioPorComunidad(this.idComunidad, idServicio).subscribe({
        next: () => {
          // Quitamos la comunidad eliminada de la lista local
          this.servicios = this.servicios.filter(c => c.id_servicio !== idServicio);
        },
        error: (err) => {
          console.error('Error al eliminar servicio', err);
          alert('No se pudo eliminar el servicio de la comunidad.');
        }
      });
      
        

    }
  }

  irAServiciosDisponibles(){

    

    
    if (this.idComunidad !== null) {
      this.router.navigate(['/admin/nuevo-servicio-por-comunidad', this.idComunidad]);
    }



  }


 


}
