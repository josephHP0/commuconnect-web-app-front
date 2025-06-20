import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-cargar-cliente-masivo',
  templateUrl: './cargar-cliente-masivo.component.html',
  styleUrls: ['./cargar-cliente-masivo.component.css']
})
export class CargarClienteMasivoComponent {



  archivoSeleccionado: File | null = null;
  excelData: any[] = [];
  excelHeaders: string[] = [];
  isHovering = false;

  constructor(private http: HttpClient,private readonly usuarioService: UsuariosService) {}

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
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const hoja = workbook.Sheets[workbook.SheetNames[0]];
      const datos = XLSX.utils.sheet_to_json(hoja);
      this.excelData = datos;
      this.excelHeaders = Object.keys(datos[0] || {});
    };
    reader.readAsArrayBuffer(file);
  }

  subirArchivo(): void {
    if (!this.excelData.length) return;
  
    this.usuarioService.cargarMasivamente(this.excelData).subscribe({
      next: () => alert('✅ Carga exitosa'),
      error: () => alert('❌ Error al cargar')
    });
  }

  eliminarArchivo(): void {
    this.archivoSeleccionado = null;
    this.excelData = [];
    this.excelHeaders = [];
  }

}
