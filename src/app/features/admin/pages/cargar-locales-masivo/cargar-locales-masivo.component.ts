import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalesService } from '../../services/locales.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cargar-locales-masivo',
  templateUrl: './cargar-locales-masivo.component.html',
  styleUrls: ['./cargar-locales-masivo.component.css']
})
export class CargarLocalesMasivoComponent implements OnInit {
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
    { campo: 'nombre', descripcion: 'Nombre del local', obligatorio: true },
    { campo: 'id_distrito', descripcion: 'ID del distrito', obligatorio: true },
    { campo: 'direccion_detallada', descripcion: 'Dirección completa del local', obligatorio: true },
    { campo: 'responsable', descripcion: 'Persona responsable del local', obligatorio: false },
    { campo: 'link', descripcion: 'URL o enlace relacionado', obligatorio: false }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localesService: LocalesService
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

        this.excelData = datos;
        this.excelHeaders = Object.keys(datos[0] || {});
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

    this.localesService.cargaMasivaLocales(this.idServicio, this.archivoSeleccionado).subscribe({
      next: (response) => {
        console.log('✅ Carga exitosa:', response);
        this.resultado = response;
        this.cargando = false;
        
        if (response.resumen?.insertados > 0) {
          this.limpiarFormulario();
        }
      },
      error: (error) => {
        console.error('❌ Error en la carga:', error);
        this.error = error.error?.detail || 'Error al procesar el archivo. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  descargarPlantilla(): void {
    // Crear datos de ejemplo para la plantilla
    const datosEjemplo = [
      ['nombre', 'id_distrito', 'direccion_detallada', 'responsable', 'link'],
      ['Gimnasio Central', '1', 'Av. Principal 123', 'Juan Pérez', ''],
      ['Sala Yoga', '2', 'Calle Secundaria 456', '', 'http://example.com'],
      ['Centro Deportivo', '3', 'Jr. Deportes 789', 'María García', '']
    ];

    // Crear contenido CSV
    const csvContent = datosEjemplo.map(fila => fila.join(',')).join('\n');
    
    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `plantilla_locales_servicio_${this.idServicio}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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

  volver(): void {
    this.router.navigate(['/admin/locales', this.idServicio]);
  }

  volverAGestion(): void {
    this.router.navigate(['/admin/gestion-servicios']);
  }
}
