import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { environment } from 'src/environments/environment';
import { GeographyService } from '../../geography.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  apiUrl = environment.apiUrl;
  registroForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  departamentos: any[] = [];
  distritos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private geographyService: GeographyService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipo_documento: ['', Validators.required],
      num_doc: ['', Validators.required],
      password: ['', Validators.required],
      repetir_password: ['', Validators.required],
      fecha_nac: ['', Validators.required],
      id_departamento: ['', Validators.required],
      id_distrito: ['', Validators.required],
      direccion: [''],
      numero_telefono: ['', Validators.required],
      genero: [''],
      peso: [''],
      talla: [''],
    });

    // Cargar departamentos al iniciar
    this.geographyService.getDepartamentos().subscribe({
      next: (data) => this.departamentos = data,
      error: (err) => console.error('Error al obtener departamentos', err)
    });

    // Cargar distritos cuando se seleccione un departamento
    this.registroForm.get('id_departamento')?.valueChanges.subscribe((id: number) => {
      if (id) {
        this.geographyService.getDistritos(id).subscribe({
          next: (data) => this.distritos = data,
          error: (err) => console.error('Error al obtener distritos', err)
        });
      } else {
        this.distritos = [];
        this.registroForm.patchValue({ id_distrito: '' });
      }
    });
  }

  onSubmit() {
    Object.keys(this.registroForm.controls).forEach(key => {
      const control = this.registroForm.get(key);
      if (control?.invalid) {
        console.log(`Campo inválido: ${key}`, control.errors);
      }
    });

    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    const formValues = this.registroForm.value;

    if (formValues.password !== formValues.repetir_password) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    const fechaNac = new Date(formValues.fecha_nac);
    const hoy = new Date();
    const edadMinima = 18;
    const edadMaxima = 120;

    if (fechaNac > hoy) {
      this.errorMessage = 'Fecha de nacimiento inválida.';
      return;
    }
    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    const dia = hoy.getDate() - fechaNac.getDate();
    if (
      edad < edadMinima ||
      (edad === edadMinima && (mes < 0 || (mes === 0 && dia < 0)))
    ) {
      this.errorMessage = 'Debes ser mayor de 18 años.';
      return;
    }
    if (edad > edadMaxima) {
      this.errorMessage = 'Fecha de nacimiento inválida.';
      return;
    }

    let telefono = formValues.numero_telefono.replace(/[\s\-]/g, '');
    if (telefono.startsWith('+51')) {
      telefono = telefono.slice(3);
    }
    if (!/^\d{9}$/.test(telefono)) {
      this.errorMessage = 'El número de teléfono debe tener 9 dígitos válidos en Perú.';
      return;
    }

    let peso: number | null = null;
    let talla: number | null = null;

    if (formValues.peso) {
      peso = parseInt(formValues.peso, 10);
      if (isNaN(peso) || peso < 30 || peso > 300) {
        this.errorMessage = 'Ingresa un peso válido entre 30 y 300 kg.';
        return;
      }
    }

    if (formValues.talla) {
      talla = parseInt(formValues.talla, 10);
      if (isNaN(talla) || talla < 50 || talla > 250) {
        this.errorMessage = 'Ingresa una talla válida entre 50 y 250 cm.';
        return;
      }
    }

    const requestBody = {
      nombre: formValues.nombre,
      apellido: formValues.apellido,
      email: formValues.email,
      tipo_documento: formValues.tipo_documento,
      num_doc: formValues.num_doc,
      password: formValues.password,
      fecha_nac: formValues.fecha_nac,
      numero_telefono: formValues.numero_telefono,
      id_departamento: parseInt(formValues.id_departamento),
      id_distrito: parseInt(formValues.id_distrito),
      direccion: formValues.direccion?.trim() || "",
      genero: formValues.genero?.trim() || "",
      peso: peso ?? 0,
      talla: talla ?? 0
    };

    this.authService.register(requestBody).subscribe({
      next: (res) => {
        console.log('Usuario registrado con éxito', res);
        this.successMessage = 'Registro exitoso. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/presentacion/confirmar-correo']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error en el registro', err);
        this.errorMessage = 'Error al registrarse. Verifica tus datos.';
      },
    });
  }
}
