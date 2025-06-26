import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesionalesService, Profesional } from '../../services/profesionales.service';

@Component({
  selector: 'app-profesionales-servicio',
  templateUrl: './profesionales-servicio.component.html',
  styleUrls: ['./profesionales-servicio.component.css']
})
export class ProfesionalesServicioComponent implements OnInit {
  idServicio!: number;
  profesionales: Profesional[] = [];
  pageSize = 10;
  currentPage = 1;

  constructor(
    private route: ActivatedRoute,
    private profesionalesService: ProfesionalesService
  ) {}

  ngOnInit(): void {
    this.idServicio = Number(this.route.snapshot.paramMap.get('id'));
    this.profesionalesService.getProfesionalesPorServicio(this.idServicio)
      .subscribe(data => {
        this.profesionales = data;
      });
  }

  get totalPages(): number {
    return Math.ceil(this.profesionales.length / this.pageSize);
  }

  get profesionalesPaginados() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.profesionales.slice(start, start + this.pageSize);
  }

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPages) {
      this.currentPage = pagina;
    }
  }

  getNombres(nombreCompleto: string): string {
    if (!nombreCompleto) return '';
    const partes = nombreCompleto.trim().split(' ');
    return partes[0] || '';
  }

  getApellidos(nombreCompleto: string): string {
    if (!nombreCompleto) return '';
    const partes = nombreCompleto.trim().split(' ');
    return partes.slice(1).join(' ');
  }

  abrirFormulario(url: string): void {
    window.open(url, '_blank');
  }
}
