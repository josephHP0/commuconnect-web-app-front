import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionVirtualFormularioService, SesionVirtualFormularioInfo, FormularioSesionVirtual } from '../sesion-virtual-formulario.service';

@Component({
  selector: 'app-completar-formulario',
  templateUrl: './completar-formulario.component.html',
  styleUrls: ['./completar-formulario.component.css']
})
export class CompletarFormularioComponent implements OnInit {
  formularioInfo: SesionVirtualFormularioInfo | null = null;
  cargando = true;
  enviando = false;
  error: string | null = null;
  exitoso = false;

  // 📁 Manejo de archivos
  archivoSeleccionado: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sesionVirtualService: SesionVirtualFormularioService
  ) {}

  ngOnInit(): void {
    const idSesion = this.route.snapshot.paramMap.get('id');
    if (idSesion) {
      this.cargarInfoFormulario(+idSesion);
    } else {
      this.error = 'ID de sesión no válido';
      this.cargando = false;
    }
  }

  // 📥 Cargar información del formulario de sesión virtual
  cargarInfoFormulario(id: number): void {
    this.sesionVirtualService.obtenerInfoFormulario(id).subscribe({
      next: (info: SesionVirtualFormularioInfo) => {
        this.formularioInfo = info;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar información del formulario:', err);
        this.error = 'Error al cargar la información del formulario';
        this.cargando = false;
      }
    });
  }

  // 📁 Manejar selección de archivo
  onArchivoSeleccionado(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      // Validar tipo y tamaño
      const tiposPermitidos = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const tamañoMaximo = 10 * 1024 * 1024; // 10MB

      if (!tiposPermitidos.includes(archivo.type)) {
        this.error = 'Solo se permiten archivos PDF y Word (.doc, .docx)';
        return;
      }

      if (archivo.size > tamañoMaximo) {
        this.error = 'El archivo debe ser menor a 10MB';
        return;
      }

      this.archivoSeleccionado = archivo;
      this.error = null;
    }
  }

  // 🗑️ Eliminar archivo seleccionado
  eliminarArchivo(): void {
    this.archivoSeleccionado = null;
    const input = document.getElementById('archivoInput') as HTMLInputElement;
    if (input) input.value = '';
  }

  // 📤 Enviar formulario
  enviarFormulario(): void {
    if (!this.formularioInfo) return;

    if (!this.archivoSeleccionado) {
      this.error = 'Debes subir un archivo';
      return;
    }

    this.enviando = true;
    this.error = null;

    const idSesion = this.route.snapshot.paramMap.get('id');
    const formulario: FormularioSesionVirtual = {
      id_sesion: +idSesion!,
      archivo: this.archivoSeleccionado
    };

    this.sesionVirtualService.enviarFormulario(formulario).subscribe({
      next: (respuesta: any) => {
        this.enviando = false;
        this.exitoso = true;
        // Redirigir después de 3 segundos (o a donde tu compañero defina)
        setTimeout(() => {
          // TODO: Aquí deberías redirigir a donde tu compañero tenga "Mis Reservas"
          this.router.navigate(['/user/mis-reservas']); 
        }, 3000);
      },
      error: (err: any) => {
        console.error('Error al enviar formulario:', err);
        this.error = 'Error al enviar el formulario. Intenta nuevamente.';
        this.enviando = false;
      }
    });
  }

  // 🔗 Abrir enlace del profesional
  abrirEnlaceProfesional(): void {
    if (this.formularioInfo?.url_formulario) {
      window.open(this.formularioInfo.url_formulario, '_blank');
    }
  }

  // ↩️ Volver (a donde tu compañero tenga la vista)
  volver(): void {
    // TODO: Coordinar con tu compañero la ruta correcta
    this.router.navigate(['/user/mis-reservas']);
  }

  // 📅 Formatear fecha
  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // 📄 Obtener nombre del archivo
  get nombreArchivo(): string {
    return this.archivoSeleccionado?.name || '';
  }

  // 📏 Obtener tamaño del archivo formateado
  get tamanioArchivo(): string {
    if (!this.archivoSeleccionado) return '';
    const bytes = this.archivoSeleccionado.size;
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  // 📁 Abrir selector de archivo
  abrirSelectorArchivo(): void {
    const input = document.getElementById('archivoInput') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }
}
