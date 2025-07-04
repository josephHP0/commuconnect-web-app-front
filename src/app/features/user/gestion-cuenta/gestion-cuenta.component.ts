import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeographyService } from '../../autenticacion/geography.service';

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
  departamento: '',
  id_departamento: 0,
  distrito: '',
  id_distrito: 0,
  direccion: '',
  peso: 0,
  talla: 0,

};


  usuarioOriginal: any = {};
  departamentos: any[] = [];
  distritos: any[] = [];
get nombreDistritoSeleccionado(): string {
  // Prioriza el nombre ya asignado desde el backend
  if (this.usuario?.distrito) {
    return this.usuario.distrito;
  }

  // Si no vino el nombre, busca en distritos cargados
  const distrito = this.distritos.find(d => d.id_distrito === this.usuario?.id_distrito);
  return distrito ? distrito.nombre : 'Sin distrito';
}

  constructor(private http: HttpClient, private geographyService: GeographyService) {}

  ngOnInit(): void {
    const idCliente = localStorage.getItem('id_cliente');

    if (idCliente) {
      this.http.get<any>(`http://localhost:8000/api/usuarios/cliente/id/${idCliente}`).subscribe({
        next: (data) => {
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

          this.usuarioOriginal = JSON.parse(JSON.stringify(this.usuario));

          // Cargar departamentos
          this.geographyService.getDepartamentos().subscribe({
            next: (departamentos) => {
              this.departamentos = departamentos;

              if (this.usuario.id_departamento) {
                this.geographyService.getDistritos(this.usuario.id_departamento).subscribe({
                  next: (distritos) => {
                    this.distritos = distritos;

                    // Mapear nombres visibles si no vinieron del backend
                    const dep = this.departamentos.find(d => d.id === this.usuario.id_departamento);
                    const dist = distritos.find(d => d.id === this.usuario.id_distrito);
                    if (!this.usuario.departamento) this.usuario.departamento = dep?.nombre || '';
                    if (!this.usuario.distrito) this.usuario.distrito = dist?.nombre || '';
                  }
                });
              }
            }
          });
        },
        error: (err) => {
          console.error('❌ Error al cargar los datos del cliente:', err);
        }
      });
    } else {
      console.warn('⚠️ id_cliente no encontrado en localStorage');
    }
  }

  // Cargar distritos al cambiar departamento
  onDepartamentoChange() {
    const idDepartamento = this.usuario.id_departamento;
    if (idDepartamento) {
      this.geographyService.getDistritos(idDepartamento).subscribe({
        next: (data) => this.distritos = data,
        error: (err) => console.error('Error al obtener distritos:', err)
      });
    } else {
      this.distritos = [];
    }
  }

  // Entrar en modo edición o guardar cambios
  onEditarGuardar() {
    if (this.editar) {
      this.guardarCambios();
    } else {
      this.usuarioOriginal = JSON.parse(JSON.stringify(this.usuario));

      this.geographyService.getDepartamentos().subscribe({
        next: (data) => {
          this.departamentos = data;

          if (this.usuario.id_departamento) {
            this.onDepartamentoChange();
          }
        },
        error: (err) => console.error('Error al obtener departamentos:', err)
      });
    }

    this.editar = !this.editar;
  }

  // Cancelar la edición
  cancelarEdicion() {
    this.usuario = JSON.parse(JSON.stringify(this.usuarioOriginal));
    this.editar = false;
  }

  // Guardar cambios al backend
guardarCambios() {
  const payloadOriginal = {
    nombre: this.usuario.nombre || undefined,
    apellido: this.usuario.apellido || undefined,
    email: this.usuario.email || undefined,
    tipo_documento: this.usuario.tipo_documento || undefined,
    num_doc: this.usuario.num_doc || undefined,
    numero_telefono: this.usuario.numero_telefono || undefined,
    id_departamento: this.usuario.id_departamento || undefined,
    id_distrito: this.usuario.id_distrito || undefined,
    direccion: this.usuario.direccion || undefined,
    fecha_nac: this.usuario.fecha_nac || undefined,
    genero: this.usuario.genero || undefined,
    talla: this.usuario.talla ? Number(this.usuario.talla) : undefined,
    peso: this.usuario.peso ? Number(this.usuario.peso) : undefined
  };

  const payload = this.limpiarPayload(payloadOriginal);  // 💡 Aquí se genera el final
  console.log('📦 Payload JSON final:', JSON.stringify(payload, null, 2));  // 💡 Ahora sí lo imprimes

  const tokenType = localStorage.getItem('token_type');
  const accessToken = localStorage.getItem('access_token');
  const headers = {
    'Authorization': `${tokenType} ${accessToken}`
  };

  this.http.put('http://localhost:8000/api/usuarios/usuario/cliente/actualizar', payload, { headers }).subscribe({
    next: (response) => {
      console.log('✅ Datos actualizados correctamente:', response);
      this.editar = false;
    },
    error: (error) => {
      console.error('❌ Error al actualizar datos:', error);
      if (error.error?.detail) console.table(error.error.detail);  // muestra qué campo falta
    }
  });
}


limpiarPayload(payload: any) {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, v]) => v !== undefined && v !== null && v !== '')
  );
}





}
