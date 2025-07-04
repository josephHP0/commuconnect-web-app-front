import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsuariosService ,Cliente} from '../../../services/usuarios.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit{


cliente: any;
idUsuarioAux:number=1;

constructor(
    private route: ActivatedRoute,
      private clienteService: UsuariosService
    
  ) {}




ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const idUsuario = this.route.snapshot.queryParamMap.get('idUsuario');
    if (id&&idUsuario) {
      this.idUsuarioAux=+idUsuario;
      this.clienteService.getClientePorId(+id).subscribe(data => {
        this.cliente = data;
        console.log(data);
      });

      


    }
  }

 guardarCambios(): void {
  if (!this.validarDocumento()) {
    alert('Número de documento inválido según el tipo seleccionado.');
    return;
  }



  const dto = {
    tipo_documento: this.cliente.tipo_documento,
    num_doc: this.cliente.num_doc,
    numero_telefono: this.cliente.numero_telefono,
    id_departamento: this.cliente.id_departamento,
    id_distrito: this.cliente.id_distrito,
    direccion: this.cliente.direccion,
    fecha_nac: this.cliente.fecha_nac,
    genero: this.cliente.genero,
    talla: this.cliente.talla,
    peso: this.cliente.peso,
    id_cliente: this.cliente.id_cliente,
    id_usuario: this.idUsuarioAux // o this.cliente.usuario.id_usuario si viene allí
  };



 console.log('DTO a enviar:', dto);


  this.clienteService.actualizarCliente(this.idUsuarioAux, dto).subscribe({

    next: () => alert('Actualizado correctamente'),
    error: err => console.error('Error al actualizar', err)
  });


}


validarDocumento(): boolean {
  const tipo = this.cliente.tipo_documento;
  const numero = this.cliente.num_doc;

  if (tipo === 'DNI') {
    return /^[0-9]{8}$/.test(numero); // exactamente 8 números
  } else if (tipo === 'CE') {
    return /^[A-Za-z0-9]{9,12}$/.test(numero); // 9 a 12 caracteres alfanuméricos
  }

  return false;
}



}
