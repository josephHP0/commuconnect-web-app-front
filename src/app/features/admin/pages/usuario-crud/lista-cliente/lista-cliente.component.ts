import { Component } from '@angular/core';

import { UsuariosService ,Cliente} from '../../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent {

clientes: Cliente[] = [];
  clientesPaginados: Cliente[] = [];
  clientesFiltrados: Cliente[] = []; 

  paginaActual = 1;
  porPagina = 10;
  totalPaginas = 0;
  totalPaginasArray: number[] = [];

  textoBusqueda: string = '';

  constructor(private usuariosService: UsuariosService,private readonly router: Router) {}

  ngOnInit(): void {
  this.usuariosService.listarClientes().subscribe({
  next: (data) => {
    this.clientes = data;
    this.clientesFiltrados = [...data];
    this.totalPaginas = Math.ceil(this.clientesFiltrados.length / this.porPagina);
    this.totalPaginasArray = Array(this.totalPaginas).fill(0).map((_, i) => i + 1);
    this.actualizarClientesPaginados();
  },
  error: (err) => {
    console.error('Error al obtener clientes:', err);
  }
});

  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.actualizarClientesPaginados();
    }
  }

actualizarClientesPaginados(): void {
  const inicio = (this.paginaActual - 1) * this.porPagina;
  const fin = inicio + this.porPagina;
  this.clientesPaginados = this.clientesFiltrados.slice(inicio, fin); // ✅ correcto
}


 filtrarClientes(): void {
  const texto = this.textoBusqueda.toLowerCase();

  this.clientesFiltrados = this.clientes.filter(c =>
    c.nombre.toLowerCase().includes(texto) ||
    c.apellido.toLowerCase().includes(texto) ||
    c.email.toLowerCase().includes(texto)
  );

  this.paginaActual = 1;
  this.totalPaginas = Math.ceil(this.clientesFiltrados.length / this.porPagina);
  this.totalPaginasArray = Array(this.totalPaginas).fill(0).map((_, i) => i + 1);
  this.actualizarClientesPaginados();
}



verCliente(id: number): void {
  this.router.navigate(['/admin/detalle-cliente/', id]);
}

editarCliente(id: number,idUsuario:number): void {
  this.router.navigate(['/admin/editar-cliente/', id],{
      queryParams: {idUsuario:idUsuario}
  });
}




eliminarCliente(id: number): void {
  if (confirm('¿Estás seguro de eliminar el cliente?')) {
    this.usuariosService.eliminarCliente(id).subscribe({
      next: () => {
        // Elimina el cliente de ambas listas
      
        this.clientes = this.clientes.filter(c => c.cliente && c.cliente.id_cliente !== id);
this.clientesFiltrados = this.clientesFiltrados.filter(c => c.cliente && c.cliente.id_cliente !== id);


        // Recalcula paginación
        this.totalPaginas = Math.ceil(this.clientesFiltrados.length / this.porPagina);
        this.totalPaginasArray = Array(this.totalPaginas).fill(0).map((_, i) => i + 1);

        // Asegura que la página actual siga siendo válida
        if (this.paginaActual > this.totalPaginas) {
          this.paginaActual = this.totalPaginas || 1;
        }

        // Actualiza los paginados
        this.actualizarClientesPaginados();

        alert('Cliente eliminado correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar el cliente', err);
        alert('No se pudo eliminar el cliente.');
      }
    });
  }
}








}
