//este import viene por defecto del componente
import { Component } from '@angular/core';

// Importa el servicio de autenticación, que probablemente esta en el modulo autenticacion que esta como auth.service.ts
import { AuthService } from '../../auth.service';

// Importa el Router de Angular para redireccionar a otras rutas desde el código
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

   // Declara y inicializa los campos que se enlazan con el formulario del login
  email: string = '';
  password: string = '';

  // Mensaje que se mostrará si hay error al autenticar
  errorMessage: string = '';

  // Bandera que indica si el usuario fue autenticado correctamente
  isAuthenticated: boolean = false;


  // Inyecta el servicio de autenticación y el Router para redirecciones
  constructor(private readonly authService: AuthService, private readonly router: Router) {}


  // Método que se ejecuta cuando el formulario de login se envía
   onSubmit() {

    // Llama al método login del servicio de autenticación, pasando el email y la contraseña
    // Este método devuelve un Observable al que nos suscribimos
    this.authService.login(this.email, this.password).subscribe({

       // Caso exitoso: el servidor respondió con credenciales válidas
      next: (response) => {
         console.log('Rol recibido del backend:', response.user_rol);
        // Autenticación exitosa
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('token_type', response.token_type);
        localStorage.setItem('user_rol', response.user_rol);
       if (response.user_rol === 'Cliente' && response.id_cliente) {
    localStorage.setItem('id_cliente', response.id_cliente.toString());
  }


        this.isAuthenticated = true; // Establece isAuthenticated a true
        this.errorMessage = ''; // Limpia cualquier mensaje de error previo

         // Redirección según el rol del usuario
        if (response.user_rol === 'Administrador') {
          this.router.navigate(['/admin']);
        }  else if (response.user_rol === 'Cliente') {

              this.authService.tieneComunidades().subscribe({
              next: (tieneComunidades: boolean) => {
                console.log('¿Tiene comunidades?:', tieneComunidades);

                if (tieneComunidades) {
                  console.log('✅ El cliente ya tiene comunidades.');
                  this.router.navigate(['/user/mis-comunidades']);
                } else {
                  console.log('ℹ️ El cliente no tiene comunidades, debe seleccionar.');
                  this.router.navigate(['/user/seleccion-comunidad']);
                }
              },
              error: (err) => {
                console.error('Error al verificar comunidades:', err);
                // Manejo de errores opcional
              }
            });

        } else {
          // Otros roles no contemplados (opcional)
          this.errorMessage = 'Rol de usuario no reconocido.';
        }
      },



      error: (error) => {
        // Error en la autenticación

        this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
        this.isAuthenticated = false; // Asegura que isAuthenticated sea false en caso de error
      },
    });
  }


}
