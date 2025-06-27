import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-sesiones-por-profesionales',
  templateUrl: './lista-sesiones-por-profesionales.component.html',
  styleUrls: ['./lista-sesiones-por-profesionales.component.css']
})
export class ListaSesionesPorProfesionalesComponent {



  idServicio!: number;
  //profesionales: Profesional[] = [];
  pageSize = 10;
  currentPage = 1;

 ngOnInit(): void {
  /*
    this.idServicio = Number(this.route.snapshot.paramMap.get('id'));
    this.profesionalesService.getProfesionalesPorServicio(this.idServicio)
      .subscribe(data => {
        this.profesionales = data;
      });
  */
  }


  
  get totalPages(): number {
   // return Math.ceil(this.profesionales.length / this.pageSize);
    return 0;
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
