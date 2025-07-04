import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestion-cuenta',
  templateUrl: './gestion-cuenta.component.html',
  styleUrls: ['./gestion-cuenta.component.css']
})
export class GestionCuentaComponent implements OnInit {
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
    departamento: '', // nombre visible
    id_departamento: 0, // ID para backend
    distrito: '', // nombre visible
    id_distrito: 0, // ID para backend
    direccion: '',
    peso: 0,
    talla: 0
  };


  usuarioOriginal: any = {}; // ✅ Se agrega para usar en cancelar

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const idCliente = localStorage.getItem('id_cliente');

    if (idCliente) {
      this.http.get<any>(`http://localhost:8000/api/usuarios/cliente/id/${idCliente}`).subscribe({
        next: (data) => {
          console.log('[DEBUG] Respuesta del backend:', data);

          this.usuario = {
            nombre: data.usuario?.nombre || '',
            apellido: data.usuario?.apellido || '',
            email: data.usuario?.email || '',
            tipo_documento: data.tipo_documento || '',
            num_doc: data.num_doc || '',
            numero_telefono: data.numero_telefono || '',
            fecha_nac: data.fecha_nac ? data.fecha_nac.split('T')[0] : '',
            genero: data.genero || '',
            id_departamento: data.id_departamento || 0,
            departamento: data.departamento_nombre || '',
            id_distrito: data.id_distrito || 0,
            distrito: data.distrito_nombre || '',
            direccion: data.direccion || '',
            peso: data.peso || 0,
            talla: data.talla || 0
          };


          // ✅ Guardamos copia para restaurar si se cancela
          this.usuarioOriginal = JSON.parse(JSON.stringify(this.usuario));
        },
        error: (err) => {
          console.error('❌ Error al cargar los datos del cliente:', err);
        }
      });
    } else {
      console.warn('⚠️ id_cliente no encontrado en localStorage');
    }
  }

  guardarCambios() {
    const payload = {
      numero_telefono: this.usuario.numero_telefono,
      id_departamento: this.usuario.id_departamento,
      id_distrito: this.usuario.id_distrito,
      direccion: this.usuario.direccion,
      genero: this.usuario.genero,
      talla: Number(this.usuario.talla),
      peso: Number(this.usuario.peso)
    };


    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `${tokenType} ${accessToken}`
    };

    this.http.put('http://localhost:8000/api/usuarios/usuario/cliente/actualizar', payload, { headers }).subscribe({
      next: (response) => {
        console.log('✅ Datos actualizados correctamente:', response);
        this.editar = false;
        this.usuarioOriginal = JSON.parse(JSON.stringify(this.usuario)); // ✅ Actualiza el original después de guardar
      },
      error: (error) => {
        console.error('❌ Error al actualizar datos:', error);
      }
    });
  }

  onEditarGuardar() {
    if (this.editar) {
      this.guardarCambios();
    } else {
      // Entra en modo edición, asegurando que usuarioOriginal tenga una copia reciente
      this.usuarioOriginal = JSON.parse(JSON.stringify(this.usuario));
    }

    this.editar = !this.editar;
  }

  cancelarEdicion() {
    this.usuario = JSON.parse(JSON.stringify(this.usuarioOriginal));
    this.editar = false;
  }
}
