import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CambiarPasswordService, CambioPasswordDTO } from '../services/cambiarContrasenha/cambiar-password.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {
  form: FormGroup;
  error: string = '';
  success: string = '';
  cargando = false;

  mostrarActual: boolean = false;
  mostrarNueva: boolean = false;
  mostrarRepetir: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cambiarPasswordService: CambiarPasswordService
  ) {
    this.form = this.fb.group({
      actual: ['', Validators.required],
      nueva: ['', [Validators.required, Validators.minLength(8)]],
      repetir: ['', [Validators.required, Validators.minLength(8)]]
    }, { validators: [this.validarNoIgual(), this.validarCoincidencia()] });
  }

  validarNoIgual() {
    return (form: FormGroup) => {
      const actual = form.get('actual')?.value;
      const nueva = form.get('nueva')?.value;
      if (actual && nueva && actual === nueva) {
        return { igualActual: true };
      }
      return null;
    };
  }

  validarCoincidencia() {
    return (form: FormGroup) => {
      const nueva = form.get('nueva')?.value;
      const repetir = form.get('repetir')?.value;
      if (nueva && repetir && nueva !== repetir) {
        return { noCoincide: true };
      }
      return null;
    };
  }

  toggleMostrarActual() {
    this.mostrarActual = !this.mostrarActual;
  }

  toggleMostrarNueva() {
    this.mostrarNueva = !this.mostrarNueva;
  }

  toggleMostrarRepetir() {
    this.mostrarRepetir = !this.mostrarRepetir;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.error = '';
    this.success = '';
    this.cargando = true;

    const datos: CambioPasswordDTO = this.form.value;

    this.cambiarPasswordService.cambiarPassword(datos)
      .pipe(finalize(() => this.cargando = false))
      .subscribe({
        next: (res) => {
          this.success = res.message || 'Contraseña cambiada exitosamente';
          this.form.reset();
        },
        error: (err) => {
          this.error = err?.error?.detail || 'Error al cambiar la contraseña';
        }
      });
  }
}