import { Component ,OnInit} from '@angular/core';
import { SesionesPorLocalService } from '../../services/sesiones-por-local.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-lista-sesiones-por-local',
  templateUrl: './lista-sesiones-por-local.component.html',
  styleUrls: ['./lista-sesiones-por-local.component.css']
})
export class ListaSesionesPorLocalComponent implements OnInit{


  idServicio!: number;
  sesiones: any[] = [];
  sesionesPaginadas: any[] = [];
  pageSize = 10;
  currentPage = 1;
  
  filtro: string = '';
  sesionesFiltradas: any[] = []; // Después del filtro

  constructor(
      private route: ActivatedRoute,
      private sesionesService: SesionesPorLocalService,
      private router: Router
  ) {}

 idLocal!: number;
  //obtenerSesionesPresenciales




  ngOnInit(): void {
    this.idServicio = Number(this.route.snapshot.queryParamMap.get('idServicio'));
    this.idLocal = Number(this.route.snapshot.paramMap.get('id'));
    this.sesionesService.obtenerSesionesPresenciales(this.idLocal).subscribe(
      (data) => {
        this.sesiones = data;
        this.sesionesFiltradas = data;
        this.cambiarPagina(1);
      },
      (error) => {
        console.error('Error al cargar sesiones:', error);
      }
    );
  }



    volverALocales(): void {

    this.router.navigate(['/admin/locales', this.idServicio]);

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
  

}
