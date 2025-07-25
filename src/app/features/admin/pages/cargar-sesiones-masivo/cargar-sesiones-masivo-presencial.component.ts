import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionesService } from '../../services/sesiones.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cargar-sesiones-masivo-presencial',
  templateUrl: './cargar-sesiones-masivo-presencial.component.html',
  styleUrls: ['./cargar-sesiones-masivo-presencial.component.css']
})
export class CargarSesionesMasivoPresencialComponent implements OnInit {
  idServicio: number = 0;
  nombreServicio: string = '';
  archivoSeleccionado: File | null = null;
  cargando: boolean = false;
  resultado: any = null;
  error: string = '';
  
  // Vista previa de datos
  excelData: any[] = [];
  excelHeaders: string[] = [];
  mostrarVistaPrevia: boolean = false;

  // Información sobre la estructura del archivo
  estructuraArchivo = [
    { campo: 'id_local', descripcion: 'ID del local donde se realizará la sesión', obligatorio: true },
    { campo: 'fecha_inicio', descripcion: 'Fecha y hora de inicio (YYYY-MM-DD HH:mm)', obligatorio: true },
    { campo: 'fecha_fin', descripcion: 'Fecha y hora de fin (YYYY-MM-DD HH:mm)', obligatorio: true },
    { campo: 'capacidad', descripcion: 'Capacidad máxima de participantes', obligatorio: true },
    { campo: 'descripcion', descripcion: 'Descripción de la sesión', obligatorio: false }
  ];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sesionesService: SesionesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idServicio = +params['id'];
    });

    // Obtener el nombre del servicio desde el state del router si está disponible
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.nombreServicio = navigation.extras.state['nombreServicio'] || 'Servicio';
    }
  }

  onArchivoSeleccionado(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      this.procesarArchivo(archivo);
    }
  }

  procesarArchivo(file: File): void {
    // Validar que sea un archivo Excel
    const extensionesValidas = ['.xlsx', '.xls'];
    const extension = file.name.toLowerCase().substr(file.name.lastIndexOf('.'));
    
    if (!extensionesValidas.includes(extension)) {
      this.error = 'Por favor seleccione un archivo Excel (.xlsx o .xls)';
      this.limpiarFormulario();
      return;
    }

    this.archivoSeleccionado = file;
    this.error = '';
    this.resultado = null;

    // Leer y procesar el archivo Excel
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const hoja = workbook.Sheets[workbook.SheetNames[0]];
        const datos = XLSX.utils.sheet_to_json(hoja);
        
        if (datos.length === 0) {
          this.error = 'El archivo Excel no contiene datos.';
          return;
        }
        // Convertir fechas seriales de Excel a formato legible
        const datosFormateados = datos.map((fila: any) => {
          const nuevaFila = { ...fila };

          if (typeof nuevaFila.fecha_inicio === 'number') {
            const fecha = XLSX.SSF.parse_date_code(nuevaFila.fecha_inicio);
            nuevaFila.fecha_inicio = new Date(fecha.y, fecha.m - 1, fecha.d, fecha.H, fecha.M).toLocaleString();
          }

          if (typeof nuevaFila.fecha_fin === 'number') {
            const fecha = XLSX.SSF.parse_date_code(nuevaFila.fecha_fin);
            nuevaFila.fecha_fin = new Date(fecha.y, fecha.m - 1, fecha.d, fecha.H, fecha.M).toLocaleString();
          }

          return nuevaFila;
        });
        this.excelData = datosFormateados;
        this.excelHeaders = Object.keys(datos[0] || {});
        const columnasRequeridas = ['id_local', 'fecha_inicio', 'fecha_fin', 'capacidad'];
        const columnasFaltantes = columnasRequeridas.filter(col => !this.excelHeaders.includes(col));

        if (columnasFaltantes.length > 0) {
          this.error = `Faltan columnas obligatorias en el archivo: ${columnasFaltantes.join(', ')}`;
          this.excelData = [];
          this.mostrarVistaPrevia = false;
          return;
        }
        this.mostrarVistaPrevia = true;
        
        console.log('📁 Archivo cargado:', file.name);
        console.log('📊 Registros encontrados:', datos.length);
        console.log('📋 Columnas detectadas:', this.excelHeaders);
        
      } catch (error) {
        console.error('Error al procesar archivo:', error);
        this.error = 'No se pudo leer el archivo Excel. Verifica que sea un archivo válido.';
        this.limpiarFormulario();
      }
    };
    reader.readAsArrayBuffer(file);
  }

  cargarArchivo(): void {
    if (!this.archivoSeleccionado || !this.datosValidos) {
      this.error = 'Por favor seleccione un archivo válido';
      
      return;
    }

    this.cargando = true;
    this.error = '';

    console.log('🚀 Enviando archivo al backend:', this.archivoSeleccionado.name);
    console.log('📊 Registros a procesar:', this.excelData.length);

    this.sesionesService.cargaMasivaSesionesPresenciales(this.idServicio, this.archivoSeleccionado).subscribe({
      next: (response: any) => {
        console.log('✅ Carga exitosa:', response);
        this.resultado = response;
        this.cargando = false;

      },
      error: (error: any) => {
        console.error('❌ Error en la carga:', error);
        this.error = error.error?.detail || 'Error al procesar el archivo. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  limpiarFormulario(): void {
    this.archivoSeleccionado = null;
    this.excelData = [];
    this.excelHeaders = [];
    this.mostrarVistaPrevia = false;
    this.error = '';
    this.resultado = null;
    
    // Limpiar el input de archivo
    const input = document.getElementById('archivo') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  eliminarArchivo(): void {
    this.limpiarFormulario();
  }

  get datosValidos(): boolean {
    return this.archivoSeleccionado !== null && this.excelData.length > 0;
  }

  descargarPlantilla(): void {
    // Solo encabezados
    const encabezados = [['id_local', 'fecha_inicio', 'fecha_fin', 'capacidad', 'descripcion']];

    const csvContent = encabezados.map(fila => fila.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `plantilla_sesiones_servicio_${this.idServicio}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  volver(): void {
    this.router.navigate(['/admin/locales', this.idServicio]);
  }

  volverAGestion(): void {
    this.router.navigate(['/admin/gestion-servicios']);
  }

  verSesiones(): void {
    this.router.navigate(['/admin/locales', this.idServicio]);
  }
} 