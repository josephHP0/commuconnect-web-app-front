import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: string = '';
  nuevaPassword: string = '';
  confirmarPassword: string = '';
  mensaje: string = '';
  valido: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener token desde la URL
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    if (!this.token) {
      this.mensaje = 'Token inválido o ausente.';
      return;
    }

    // Aquí solo verificamos si hay token en localStorage
    // Si quieres verificar el token del enlace, deberías implementar otro método en el backend
    this.valido = true;
  }

  cambiarContrasena(): void {
    if (this.nuevaPassword.length < 8) {
      this.mensaje = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden.';
      return;
    }

    this.authService.resetearContrasena(this.token, this.nuevaPassword).subscribe(resp => {
      this.mensaje = resp.mensaje;
      if (resp.exito) {
        setTimeout(() => {
          this.router.navigate(['/autenticacion/login']);
        }, 2500);
      }
    });
  }
}
