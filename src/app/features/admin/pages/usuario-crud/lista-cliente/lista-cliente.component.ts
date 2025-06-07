import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent {





  clientes = [

    { id: 1, nombre: "Lucía", apellido: "Torres", email: "lt@cc.com" },
    { id: 2, nombre: "Michael", apellido: "Santos", email: "ms@cc.com" },
    { id: 3, nombre: "Carla", apellido: "Reyes", email: "cr@cc.com" },
    { id: 4, nombre: "Jorge", apellido: "Quispe", email: "jq@cc.com" },
    { id: 5, nombre: "Daniela", apellido: "Morales", email: "dm@cc.com" },
    { id: 6, nombre: "Luis", apellido: "Ríos", email: "lr@cc.com" },
    { id: 7, nombre: "Luis", apellido: "García", email: "lgarcia@cc.com" },
    { id: 8, nombre: "María", apellido: "Rojas", email: "mr@cc.com" },
    { id: 9, nombre: "Ana", apellido: "López", email: "ana@cc.com" },
    { id: 10, nombre: "Luis", apellido: "Pérez", email: "luis@cc.com" },
    { id: 11, nombre: "Elena", apellido: "Gómez", email: "elena@cc.com" },
    { id: 12, nombre: "Carlos", apellido: "Díaz", email: "carlos@cc.com" },
    { id: 13, nombre: "Sara", apellido: "Torres", email: "sara@cc.com" },
    { id: 14, nombre: "Moises", apellido: "Borre", email: "gianfranco.force@gmail.com" },
    { id: 15, nombre: "Patricia", apellido: "XD", email: "jawoki2561@besibali.com" },
    { id: 16, nombre: "sebass", apellido: "martt", email: "a@hotmail.com" }

  ];




clientesPaginados: any[] = [];
paginaActual = 1;
porPagina = 10;
totalPaginas = 0;
totalPaginasArray: number[] = [];

ngOnInit() {
  this.totalPaginas = Math.ceil(this.clientes.length / this.porPagina);
  this.totalPaginasArray = Array(this.totalPaginas).fill(0).map((_, i) => i + 1);
  this.actualizarClientesPaginados();
}

cambiarPagina(nuevaPagina: number) {
  if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
    this.paginaActual = nuevaPagina;
    this.actualizarClientesPaginados();
  }
}

actualizarClientesPaginados() {
  const inicio = (this.paginaActual - 1) * this.porPagina;
  const fin = inicio + this.porPagina;
  this.clientesPaginados = this.clientes.slice(inicio, fin);
}





textoBusqueda: string = '';

filtrarClientes() {
  // Aquí puedes implementar el filtrado con this.textoBusqueda
}




}
