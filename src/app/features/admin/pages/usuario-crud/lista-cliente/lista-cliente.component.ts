import { Component } from '@angular/core';

import { UsuariosService ,Cliente} from '../../../services/usuarios.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent {

clientes: Cliente[] = [];
  clientesPaginados: Cliente[] = [];

  paginaActual = 1;
  porPagina = 10;
  totalPaginas = 0;
  totalPaginasArray: number[] = [];

  textoBusqueda: string = '';

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuariosService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.totalPaginas = Math.ceil(this.clientes.length / this.porPagina);
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
    this.clientesPaginados = this.clientes.slice(inicio, fin);
  }

 filtrarClientes(): void {
  const texto = this.textoBusqueda.toLowerCase();

  const filtrados = this.clientes.filter(c =>
    c.nombre.toLowerCase().includes(texto) ||
    c.apellido.toLowerCase().includes(texto) ||
    c.email.toLowerCase().includes(texto)
  );

  // Reinicia a la primera página después del filtro
  this.paginaActual = 1;

  // Recalcula paginación con los filtrados
  this.totalPaginas = Math.ceil(filtrados.length / this.porPagina);
  this.totalPaginasArray = Array(this.totalPaginas).fill(0).map((_, i) => i + 1);

  // Actualiza los clientes visibles
  this.clientesPaginados = filtrados.slice(
    (this.paginaActual - 1) * this.porPagina,
    this.paginaActual * this.porPagina
  );
}




}
