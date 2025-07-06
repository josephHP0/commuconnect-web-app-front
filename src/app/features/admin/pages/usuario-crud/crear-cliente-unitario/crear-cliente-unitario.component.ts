import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteCreate, CrearClienteUnitarioService } from '../../../services/crear-cliente-unitario.service';

@Component({
  selector: 'app-crear-cliente-unitario',
  templateUrl: './crear-cliente-unitario.component.html',
  styleUrls: ['./crear-cliente-unitario.component.css']
})
export class CrearClienteUnitarioComponent {
  cliente: ClienteCreate = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    tipo_documento: 'DNI',
    num_doc: '',
    fecha_nac: '',
    id_departamento: 0,
    id_distrito: 0,
    direccion: '',
    numero_telefono: '',
    genero: '',
    talla: 0,
    peso: 0
  };

  constructor(private clienteService: CrearClienteUnitarioService, private router: Router) {}

  registrar() {
    this.clienteService.registrarCliente(this.cliente).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Cliente registrado correctamente', 'success');
        this.router.navigate(['/admin/lista-cliente']);
      },

      error: () => {
        Swal.fire('Error', 'No se pudo registrar el cliente', 'error');
      }
    });
  }
  volver() {
    this.router.navigate(['/admin/lista-cliente']);
  }
}
