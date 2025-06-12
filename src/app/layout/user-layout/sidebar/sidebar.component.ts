import { Component } from '@angular/core';
//import { ComunidadService, ComunidadContexto } from '../services/comunidad.service';
import { ComunidadService, ComunidadContexto } from '../../../features/user/services/comunidad.service';
import { switchMap, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  comunidadSeleccionada: any;

  topesDisponibles: number = 0;


  tieneTopes: boolean = false;
  mostrarAlerta: boolean = false;


  constructor(private comunidadService: ComunidadService,private router: Router
  ) {}


  ngOnInit(): void {
    
    const comunidadJson = localStorage.getItem('comunidad_seleccionada');
    if (comunidadJson) {
      this.comunidadSeleccionada = JSON.parse(comunidadJson);
    }
    

  }

  /*

verificarYObtenerTopes(): void {

  topesActuales=verificarSiTieneTopes(id)

  if (topesActuales) {
    // Si tiene topes, obtener cantidad
    this.comunidadService.obtenerCantidadTopes(id).subscribe((data: any) => {
      this.topesDisponibles = data.topes_disponibles;
      if(this.topesDisponibles==0){
          //quiero en el html del componente la seccion de servicios cada vez que le de click
          //me salga una tarjeta de peligro no tienes reservas disponibles.
      }else if (this.topesDisponibles>0){
          //quiero que al darle click en la seccion me lleve a esa pantalla que apunta normalmente
      }else{
          console.log("topes negativos")
      }
    });
  }
*/

/*
this.comunidadService.verificarSiTieneTopes(id).subscribe((respuesta: any) => {
  this.tieneTopes = respuesta.tieneTopes;

  if (this.tieneTopes) {
    // Si tiene topes, obtener cantidad
    this.comunidadService.obtenerCantidadTopes(id).subscribe((data: any) => {
      this.topesDisponibles = data.topes_disponibles;
    });
  }
});
*/


verificarSiPuedeAccederAServicios(): void {
  const comunidadGuardada = localStorage.getItem('comunidad_seleccionada');

  //console.log(comunidadGuardada)

  if (!comunidadGuardada) {
    alert('No hay comunidad seleccionada');
    return;
  }

  const comunidad = JSON.parse(comunidadGuardada);
  const id = comunidad.id_comunidad;

  console.log(id + "topes traidos")

 

  this.comunidadService.verificarSiTieneTopes(id).pipe(
    switchMap((valor: any) => {

      console.log("Valor retornado por verificarSiTieneTopes:", valor);
      const tieneTopes = valor.tieneTopes === true;

      if (tieneTopes) {
        // Si tiene topes habilitados, verificar cuántos tiene
        return this.comunidadService.obtenerCantidadTopes(id);
      } else {
        // Si no tiene topes habilitados, devolvemos 0 directamente
        return of(0);
      }
    })
  ).subscribe((data: any) => {

    console.log("🟢 Valor retornado por obtenerCantidadTopes:", data);

   // this.topesDisponibles = data.topes_disponibles;
    this.topesDisponibles = 0;

    if (this.topesDisponibles > 0) {
      // Tiene topes disponibles, permitir navegación
      this.router.navigate(['/user/seleccionar-servicio']); // <-- Reemplaza con tu ruta real
    } else if(this.topesDisponibles == 0) {
      // No tiene topes o están deshabilitados
      this.mostrarAlerta = true; 
    }else{
      this.mostrarAlertaProblemaTopesNegativos();
    }
  });

}

cerrarAlerta() {
  this.mostrarAlerta = false;
}

mostrarAlertaProblemaTopesNegativos(): void {
  // Puedes hacer un alert temporal o mostrar un div en el HTML (más recomendable)
  alert('problema en manejo de topes negativos');
}





 



}
