import { Component } from '@angular/core';

import { Router ,ActivatedRoute} from '@angular/router';
import { ServiciosPorComunidadService } from '../../services/servicios-por-comunidad.service';



@Component({
  selector: 'app-nuevo-servicio-por-comunidad',
  templateUrl: './nuevo-servicio-por-comunidad.component.html',
  styleUrls: ['./nuevo-servicio-por-comunidad.component.css']
})
export class NuevoServicioPorComunidadComponent {


  idComunidad: number | null = null;

  servicioSeleccionado: any = null;


  comunidad = {
    nombre: '',
    slogan: '',
    imagen:''

  };

  imagenURL: string | ArrayBuffer | null = null;

  servicios: any[] = [];

  serviciosAgrupados: any[][] = [];

  constructor(
     private readonly serviciosPorComunidadService: ServiciosPorComunidadService,
     private readonly router: Router,
     private readonly route: ActivatedRoute
   ) {}

  ngOnInit():void{



    



    this.idComunidad = Number(this.route.snapshot.paramMap.get('id'));

    console.log('Click en Añadir servicio. idComunidad:', this.idComunidad);

    this.cargarLosServiciosDisponibles(this.idComunidad);


      /*
       for (let i = 1; i <= 100; i++) {
        this.servicios.push({
          id_servicio: i,
          nombre: `Servicio ${i}`,
          descripcion: `Descripción del servicio ${i}`,
          modalidad: 'Presencial',
          imagen: null
        });
      }
      */
  }

  cargarLosServiciosDisponibles(id:number){


    if (id) {
      this.serviciosPorComunidadService.obtenerServiciosDisponiblesPorComunidad(id)
      .subscribe({
        next: (data) => {
          console.log('Servicios recibidos:', data); // ✅ Este es un array
        
          this.servicios = data; // ✅ OK: `data` es un array
        
          this.serviciosAgrupados = [];
          for (let i = 0; i < this.servicios.length; i += 3) {
            this.serviciosAgrupados.push(this.servicios.slice(i, i + 3));
          }
        },
        error: (err) => console.error('Error al cargar servicios', err)
      });
    }

  }



  seleccionarServicio(servicio: any) {
    this.servicioSeleccionado = servicio === this.servicioSeleccionado ? null : servicio;
  }
  
  agregarServicioSeleccionado() {
    if (this.servicioSeleccionado && this.idComunidad) {
      const idServicio = this.servicioSeleccionado.id_servicio;
  
      console.log('Agregando servicio ID:', idServicio, 'a comunidad ID:', this.idComunidad);
  
      this.serviciosPorComunidadService.agregarServicioAComunidad(this.idComunidad, idServicio)
        .subscribe({
          next: (resp) => {
            console.log('Servicio agregado correctamente:', resp);
            alert('Servicio agregado a la comunidad');
            this.servicioSeleccionado = null; // opcional: deseleccionar
          
              this.cargarLosServiciosDisponibles(this.idComunidad!);
            
            
          },
          error: (err) => {
            console.error('Error al agregar servicio:', err);
            alert('No se pudo agregar el servicio');
          }
        });
    }
  }





}
