import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { SesionesPorProfesionalService } from '../../services/sesiones-por-profesional.service';

@Component({
  selector: 'app-lista-sesiones-por-profesionales',
  templateUrl: './lista-sesiones-por-profesionales.component.html',
  styleUrls: ['./lista-sesiones-por-profesionales.component.css']
})
export class ListaSesionesPorProfesionalesComponent implements OnInit{
idServicio!: number;

sesiones: any[] = [];
  sesionesPaginadas: any[] = [];
  pageSize = 10;
  currentPage = 1;
  idProfesional!: number;



filtro: string = '';

sesionesFiltradas: any[] = []; // Después del filtro





  constructor(
    private route: ActivatedRoute,
    private sesionesService: SesionesPorProfesionalService,
    private router: Router
  ) {}


 

  ngOnInit(): void {
    this.idServicio = Number(this.route.snapshot.queryParamMap.get('idServicio'));
    this.idProfesional = Number(this.route.snapshot.paramMap.get('id'));
    this.sesionesService.obtenerSesionesVirtuales(this.idProfesional).subscribe(
      (data) => {
        this.sesiones = data;
        console.log(data);
        this.sesionesFiltradas = data;
        this.cambiarPagina(1);
      },
      (error) => {
        console.error('Error al cargar sesiones:', error);
      }
    );
  }

  get totalPages(): number {
  return Math.ceil(this.sesionesFiltradas.length / this.pageSize);
}

 cambiarPagina(pagina: number): void {
  if (pagina >= 1 && pagina <= this.totalPages) {
    this.currentPage = pagina;
    const start = (pagina - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.sesionesPaginadas = this.sesionesFiltradas.slice(start, end);
  }
}

    volverAProfesionales(): void {
    this.router.navigate(['/admin/servicio', this.idServicio, 'profesionales']);
  }

  filtrarSesiones(): void {
  const texto = this.filtro.trim().toLowerCase();

  this.sesionesFiltradas = this.sesiones.filter(s =>
    s.fecha.toLowerCase().includes(texto) ||
    s.hora_inicio.toLowerCase().includes(texto) ||
    s.hora_fin.toLowerCase().includes(texto)
  );

  this.cambiarPagina(1);
}


}
