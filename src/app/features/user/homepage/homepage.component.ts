import { Component, OnInit } from '@angular/core';
import { ComunidadService, ComunidadContexto } from '../services/comunidad.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  comunidad: ComunidadContexto | null = null;
  topesDisponibles: number = 0;


  tieneTopes: boolean = false;




  constructor(private comunidadService: ComunidadService) {}


  ngOnInit(): void {
  const comunidadGuardada = localStorage.getItem('comunidad_seleccionada');
  if (comunidadGuardada) {
    const comunidad = JSON.parse(comunidadGuardada);
    const id = comunidad.id_comunidad;

    this.comunidadService.obtenerComunidadPorId(id).subscribe({
      next: (data) => {
        console.log(data)
        // Transformar la imagen si es base64 crudo
        if (data.imagen && !data.imagen.startsWith('data:image')) {
          data.imagen = 'data:image/png;base64,' + data.imagen;
        }

        this.comunidad = data;
      },
      error: (err) => console.error('Error al cargar comunidad:', err)
    });

    



    this.comunidadService.verificarSiTieneTopes(id).subscribe((respuesta: any) => {
      this.tieneTopes = respuesta.tieneTopes;

      if (this.tieneTopes) {
        // Si tiene topes, obtener cantidad
        this.comunidadService.obtenerCantidadTopes(id).subscribe((data: any) => {
          this.topesDisponibles = data.topes_disponibles;
        });
      }
    });


 
    

   

  }
}

}
