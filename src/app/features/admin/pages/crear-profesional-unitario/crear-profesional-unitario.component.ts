import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CrearProfesionalUnitarioService, ProfesionalCreate } from '../../services/crear-profesional-unitario.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-crear-profesional-unitario',
  templateUrl: './crear-profesional-unitario.component.html',
  styleUrls: ['./crear-profesional-unitario.component.css']
})
export class CrearProfesionalUnitarioComponent implements OnInit {
  profesional: ProfesionalCreate = {
    nombre_completo: '',
    email: '',
    id_servicio: 0,
    formulario: ''
  };

  idServicio!: number;

  constructor(
    private profesionalService: CrearProfesionalUnitarioService,
    private router: Router,
    private route: ActivatedRoute,private location: Location
  ) {}

  ngOnInit(): void {
    this.idServicio = Number(this.route.snapshot.paramMap.get('id'));
    this.profesional.id_servicio = this.idServicio;
  }

  registrarProfesional(): void {
  this.profesionalService.registrarProfesional(this.profesional).subscribe({
    next: () => {
      alert('Profesional registrado con éxito');
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate([`/admin/servicio/${this.idServicio}/profesionales`]);
    },
    error: (err) => {
      console.error(err);
      alert('Error al registrar el profesional');
    }
  });
}

  volver(): void {
    this.location.back(); 
  }


}
