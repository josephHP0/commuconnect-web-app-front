import { Component } from '@angular/core';

import { AuthService } from '../../auth.service';

import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  apiUrl = environment.apiUrl;
  email: string = '';
  password: string = '';
  errorMessage: string = '';
   isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

   onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Autenticación exitosa
        console.log('Autenticación exitosa', response);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('token_type', response.token_type);
        this.isAuthenticated = true; // Establece isAuthenticated a true
        this.errorMessage = ''; // Limpia cualquier mensaje de error previo
        // Opcional: Redirigir al usuario después de mostrar el mensaje
        setTimeout(() => {
          this.router.navigate(['/']); // Redirige a la raíz (ajusta según tu necesidad)
        }, 1500); // Muestra el mensaje por 1.5 segundos
      },
      error: (error) => {
        // Error en la autenticación
        console.error('Error en la autenticación', error);
        this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
        this.isAuthenticated = false; // Asegura que isAuthenticated sea false en caso de error
      },
    });
  }


}
