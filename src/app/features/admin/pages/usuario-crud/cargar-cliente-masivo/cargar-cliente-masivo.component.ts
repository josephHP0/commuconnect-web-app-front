import { Component, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from '../../../services/usuarios.service';
import { NotificationData } from 'src/app/shared/components/notification/notification.component';

export interface ClienteExcel {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  tipo_documento: string;
  num_doc: string;
  numero_telefono: string;
  id_departamento: number;
  id_distrito: number;
  direccion?: string;
  fecha_nac?: string;
  genero?: string;
  talla?: number;
  peso?: number;
}

@Component({
  selector: 'app-cargar-cliente-masivo',
  templateUrl: './cargar-cliente-masivo.component.html',
  styleUrls: ['./cargar-cliente-masivo.component.css']
})
export class CargarClienteMasivoComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  archivoSeleccionado: File | null = null;
  excelData: any[] = [];
  excelHeaders: string[] = [];
  isHovering = false;
  procesando = false;

  // Notification
  showNotification: boolean = false;
  notificationData: NotificationData = {
    type: 'info',
    title: '',
    message: ''
  };

  // Mapeo de columnas del Excel a campos del backend
  readonly columnMapping: { [key: string]: string } = {
    // Nombres exactos esperados
    'nombre': 'nombre',
    'apellido': 'apellido', 
    'email': 'email',
    'password': 'password',
    'tipo_documento': 'tipo_documento',
    'num_doc': 'num_doc',
    'numero_telefono': 'numero_telefono',
    'id_distrito': 'id_distrito', // ← Mapeo: id_distrito del Excel → id_distrito del backend
    'id_departamento': 'id_departamento', // ← Mapeo: id_departamento del Excel → id_departamento del backend
    'direccion': 'direccion',
    'fecha_nac': 'fecha_nac',
    'genero': 'genero',
    'talla': 'talla',
    'peso': 'peso',
    // Variaciones con mayúsculas
    'Nombre': 'nombre',
    'Apellido': 'apellido',
    'Email': 'email',
    'Password': 'password',
    'Tipo Documento': 'tipo_documento',
    'Número Documento': 'num_doc',
    'Teléfono': 'numero_telefono',
    'ID Distrito': 'id_distrito',
    'ID Departamento': 'id_departamento',
    'Dirección': 'direccion',
    'Fecha Nacimiento': 'fecha_nac',
    'Género': 'genero',
    // Variaciones con espacios
    ' id_distrito': 'id_distrito',
    'id_distrito ': 'id_distrito',
    ' id_distrito ': 'id_distrito',
    ' id_departamento': 'id_departamento',
    'id_departamento ': 'id_departamento',
    ' id_departamento ': 'id_departamento'
  };

  constructor(private http: HttpClient, private readonly usuarioService: UsuariosService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.procesarArchivo(file);
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isHovering = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.procesarArchivo(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isHovering = true;
  }

  onDragLeave(event: DragEvent): void {
    this.isHovering = false;
  }

  procesarArchivo(file: File): void {
    this.archivoSeleccionado = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const hoja = workbook.Sheets[workbook.SheetNames[0]];
        const datos = XLSX.utils.sheet_to_json(hoja);
        
        if (datos.length === 0) {
          this.showNotificationMessage('warning', 'Archivo vacío', 'El archivo Excel no contiene datos.');
          return;
        }

        this.excelData = datos;
        this.excelHeaders = Object.keys(datos[0] || {});
        
        console.log('📁 Archivo cargado:', file.name);
        console.log('📊 Registros encontrados:', datos.length);
        console.log('📋 Columnas detectadas:', this.excelHeaders);
        
        this.showNotificationMessage(
          'success', 
          'Archivo cargado', 
          `Se detectaron ${datos.length} registros en el archivo. Revisa la vista previa antes de cargar.`
        );
        
      } catch (error) {
        console.error('Error al procesar archivo:', error);
        this.showNotificationMessage('error', 'Error al procesar', 'No se pudo leer el archivo Excel. Verifica que sea un archivo válido.');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  private validarColumnas(columnasRequeridas: string[]): string[] {
    const columnasFaltantes: string[] = [];
    
    for (const columna of columnasRequeridas) {
      // Verificar si la columna existe directamente en los headers del Excel
      const encontrada = this.excelHeaders.includes(columna);
      
      if (!encontrada) {
        columnasFaltantes.push(columna);
      }
    }
    
    return columnasFaltantes;
  }

  private mapearDatos(): ClienteExcel[] {
    return this.excelData.map((fila, index) => {
      const clienteMapeado: any = {};
      
      // Mapear cada columna del Excel al campo correspondiente
      for (const [excelColumn, valor] of Object.entries(fila)) {
        const campoBackend = this.columnMapping[excelColumn];
        if (campoBackend) {
          clienteMapeado[campoBackend] = valor;
        }
      }

      // Validaciones y transformaciones para id_departamento
      if (clienteMapeado.id_departamento) {
        clienteMapeado.id_departamento = parseInt(clienteMapeado.id_departamento) || 1;
      } else {
        clienteMapeado.id_departamento = 1; // Valor por defecto
      }

      // Validaciones y transformaciones para id_distrito
      if (clienteMapeado.id_distrito) {
        clienteMapeado.id_distrito = parseInt(clienteMapeado.id_distrito) || 1;
      } else {
        clienteMapeado.id_distrito = 1; // Valor por defecto
      }

      // Validar campos requeridos (los que están en el Excel)
      const camposRequeridos = ['nombre', 'apellido', 'email', 'password', 'tipo_documento', 'num_doc', 'numero_telefono', 'id_departamento', 'id_distrito'];
      for (const campo of camposRequeridos) {
        if (!clienteMapeado[campo] || clienteMapeado[campo].toString().trim() === '') {
          throw new Error(`Fila ${index + 1}: El campo '${campo}' es requerido`);
        }
      }

      // Limpiar datos obligatorios
      clienteMapeado.nombre = clienteMapeado.nombre.toString().trim();
      clienteMapeado.apellido = clienteMapeado.apellido.toString().trim();
      clienteMapeado.email = clienteMapeado.email.toString().trim().toLowerCase();
      clienteMapeado.tipo_documento = clienteMapeado.tipo_documento.toString().trim();
      clienteMapeado.num_doc = clienteMapeado.num_doc.toString().trim();
      clienteMapeado.numero_telefono = clienteMapeado.numero_telefono.toString().trim();
      
      // Limpiar datos opcionales si existen
      if (clienteMapeado.direccion) {
        clienteMapeado.direccion = clienteMapeado.direccion.toString().trim();
      }
      if (clienteMapeado.fecha_nac) {
        clienteMapeado.fecha_nac = clienteMapeado.fecha_nac.toString().trim();
      }
      if (clienteMapeado.genero) {
        clienteMapeado.genero = clienteMapeado.genero.toString().trim();
      }
      if (clienteMapeado.talla) {
        clienteMapeado.talla = parseInt(clienteMapeado.talla) || null;
      }
      if (clienteMapeado.peso) {
        clienteMapeado.peso = parseInt(clienteMapeado.peso) || null;
      }
      
      return clienteMapeado as ClienteExcel;
    });
  }

  subirArchivo(): void {
    if (!this.archivoSeleccionado) {
      this.showNotificationMessage('warning', 'Sin archivo', 'No hay archivo seleccionado para cargar.');
      return;
    }

    if (!this.datosValidos) {
      this.showNotificationMessage('warning', 'Datos inválidos', 'El archivo no tiene el formato correcto.');
      return;
    }

    this.procesando = true;

    console.log('🚀 Enviando archivo directamente al backend:', this.archivoSeleccionado.name);
    
    this.usuarioService.cargarMasivamente(this.archivoSeleccionado).subscribe({
      next: (response) => {
        this.procesando = false;
        const { insertados, omitidos, errores } = response.resumen;

        let mensaje = `
          <div>
            <div>Se procesaron ${insertados + omitidos} registros.</div>
            <div>${insertados} insertados correctamente.</div>
            ${omitidos > 0 ? `<div>${omitidos} omitidos (duplicados o datos faltantes).</div>` : ''}
            ${errores && errores.length > 0 ? `
              <div><b>Errores:</b></div>
              <ul>
                ${errores.map((e: string) => `<li>${e}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `;

        this.showNotificationMessage(
          insertados > 0 ? 'success' : 'warning',
          insertados > 0 ? '¡Carga completada!' : 'Carga con problemas',
          mensaje
        );

        if (insertados > 0) {
          this.limpiarFormulario();
        }
      },
      error: (error) => {
        this.procesando = false;
        console.error('❌ Error al cargar:', error);
        
        let mensaje = 'No se pudo procesar el archivo. ';
        if (error.error?.detail) {
          mensaje += error.error.detail;
        } else if (error.status === 422) {
          mensaje += 'El archivo no tiene el formato correcto o faltan datos requeridos.';
        } else if (error.status === 413) {
          mensaje += 'El archivo es demasiado grande.';
        } else {
          mensaje += 'Por favor, verifica el archivo e inténtalo de nuevo.';
        }
        
        this.showNotificationMessage('error', 'Error al procesar', mensaje);
      }
    });
  }

  eliminarArchivo(): void {
    this.limpiarFormulario();
  }

  private limpiarFormulario(): void {
    this.archivoSeleccionado = null;
    this.excelData = [];
    this.excelHeaders = [];
    // Limpia el input de archivo para permitir volver a seleccionar el mismo archivo
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  private showNotificationMessage(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void {
    this.notificationData = {
      type,
      title,
      message,
      duration: type === 'success' ? 4000 : 0
    };
    this.showNotification = true;
  }

  onNotificationClose(): void {
    this.showNotification = false;
  }

  get datosValidos(): boolean {
    if (!this.archivoSeleccionado) return false;
    
    const extensionesValidas = ['.xlsx', '.xls'];
    const extension = this.archivoSeleccionado.name.toLowerCase().substring(this.archivoSeleccionado.name.lastIndexOf('.'));
    
    return extensionesValidas.includes(extension);
  }
}
