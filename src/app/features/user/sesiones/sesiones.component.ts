import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {

  distritos: string[] = ['San Miguel', 'San Isidro'];
  distritoSeleccionado = '';
  localSeleccionado = '';

  locales = [
    {
      nombre: 'La Tiendita',
      distrito: 'San Miguel',
      imagen: '/assets/tiendita.png',
      direccion: 'Mz. F Lote 30 Urb. Sta...'
    },
    {
      nombre: 'YOGABOX',
      distrito: 'San Miguel',
      imagen: '/assets/yogabox.png',
      direccion: 'Mz. F Lote 30 Urb. Sta...'
    },
    {
      nombre: 'FITBOX',
      distrito: 'San Miguel',
      imagen: '/assets/fitbox.png',
      direccion: 'Mz. F Lote 30 Urb. Sta...'
    },
    {
      nombre: 'UrbanFit',
      distrito: 'San Isidro',
      imagen: '/assets/urbanfit.png',
      direccion: 'Av. Lima 123, San Isidro'
    }
  ];

  localesFiltrados: {
    nombre: string;
    distrito: string;
    imagen: string;
    direccion: string;
  }[] = [];

  fechasDisponibles: string[] = [
    '13/05/2025',
    '14/05/2025',
    '15/05/2025',
    '16/05/2025',
    '17/05/2025',
    '18/05/2025'
  ];
  fechasFiltradas: string[] = [];

  fechaInicioFiltro: string = '';
  fechaFinFiltro: string = '';

  ngOnInit(): void {
    // Solo distritos al inicio
    this.localesFiltrados = this.getLocalesRepresentativosPorDistrito();
    this.fechasFiltradas = [];
  }


  // ✅ Nivel 1 → Al seleccionar distrito, desbloquear locales
  filtrarPorDistrito(): void {
    this.localSeleccionado = '';
    this.fechaInicioFiltro = '';
    this.fechaFinFiltro = '';
    this.fechasFiltradas = [];

    if (this.distritoSeleccionado) {
      this.localesFiltrados = this.locales.filter(
        l => l.distrito === this.distritoSeleccionado
      );
    } else {
      this.localesFiltrados = this.getLocalesRepresentativosPorDistrito();
    }
  }

  // ✅ Nivel 2 → Al seleccionar local, desbloquear fechas
  seleccionarLocal(local: any): void {
    this.localSeleccionado = local.nombre;
    this.fechasFiltradas = [...this.fechasDisponibles];
  }

  // ✅ Nivel 3 → Rango de fechas para filtrar
  filtrarFechasPorRango(): void {
    if (!this.fechaInicioFiltro || !this.fechaFinFiltro) {
      this.fechasFiltradas = [...this.fechasDisponibles];
      return;
    }

    const inicio = new Date(this.fechaInicioFiltro);
    const fin = new Date(this.fechaFinFiltro);

    this.fechasFiltradas = this.fechasDisponibles.filter(fecha => {
      const actual = new Date(fecha.split('/').reverse().join('-'));
      return actual >= inicio && actual <= fin;
    });
  }

  continuar(): void {
    if (this.localSeleccionado) {
      console.log('Local seleccionado:', this.localSeleccionado);
      localStorage.setItem('local_seleccionado', this.localSeleccionado);
    }
  }

  // Muestra solo un local por distrito al inicio
  private getLocalesRepresentativosPorDistrito(): any[] {
    const mapa = new Map<string, any>();
    this.locales.forEach(local => {
      if (!mapa.has(local.distrito)) {
        mapa.set(local.distrito, local);
      }
    });
    return Array.from(mapa.values());
  }
  seleccionarLocalPorNombre(): void {
    const local = this.localesFiltrados.find(l => l.nombre === this.localSeleccionado);
    if (local) this.seleccionarLocal(local);
  }

}
