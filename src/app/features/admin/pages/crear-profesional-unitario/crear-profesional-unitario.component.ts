import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrearProfesionalUnitarioService, ProfesionalCreate } from '../../services/crear-profesional-unitario.service';

@Component({
  selector: 'app-crear-profesional-unitario',
  templateUrl: './crear-profesional-unitario.component.html',
  styleUrls: ['./crear-profesional-unitario.component.css']
})
export class CrearProfesionalUnitarioComponent {
  profesional: ProfesionalCreate = {
    nombre_completo: '',
    email: '',
    id_servicio: 0,
    formulario: ''
  };
  servicios: any[] = [];
  constructor(
    private profesionalService: CrearProfesionalUnitarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.cargarServicios(); 
  }


  registrarProfesional(): void {
    this.profesionalService.registrarProfesional(this.profesional).subscribe({
      next: () => {
        alert('Profesional registrado con éxito');
        this.router.navigate(['/usuarios']); // O ruta que corresponda
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar el profesional');
      }
    });
  }

  volver(): void {
    this.router.navigate(['/usuarios']); // O la ruta desde la que se llegó
  }
}
