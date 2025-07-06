import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsuariosService ,Cliente} from '../../../services/usuarios.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {

cliente: any;


constructor(
    private route: ActivatedRoute,
      private clienteService: UsuariosService
    
  ) {}

ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clienteService.getClientePorId(+id).subscribe(data => {
        this.cliente = data;
        console.log(this.cliente);
      });

      


    }
  }

}
