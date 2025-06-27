import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-cuenta',
  templateUrl: './gestion-cuenta.component.html',
  styleUrls: ['./gestion-cuenta.component.css']
})
export class GestionCuentaComponent {
  editar: boolean = false;

  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    numero_telefono: '',
    tipo_documento: '',
    num_doc: '',
    fecha_nac: '',
    genero: '',
    departamento: '',
    distrito: '',
    direccion: '',
    peso: 0,
    talla: 0
  };

  guardarCambios() {
    this.editar = false;
    // Aquí va la lógica para enviar los datos al backend
    console.log('Cambios guardados:', this.usuario);
  }
}
