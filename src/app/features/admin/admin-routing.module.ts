import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layout/admin-layout/admin/admin-layout.component';




import { RegistroComunidadComponent } from './pages/registro-comunidad/registro-comunidad.component';
import { ListaComunidadComponent } from './pages/lista-comunidad/lista-comunidad.component';
import { EditarComunidadComponent } from './pages/editar-comunidad/editar-comunidad.component';
import { ListaClienteComponent } from './pages/usuario-crud/lista-cliente/lista-cliente.component';
import { ServiciosPorComunidadComponent } from './pages/servicios-por-comunidad/servicios-por-comunidad.component';
import { NuevoServicioPorComunidadComponent } from './pages/nuevo-servicio-por-comunidad/nuevo-servicio-por-comunidad.component';
import { CargarClienteMasivoComponent } from './pages/usuario-crud/cargar-cliente-masivo/cargar-cliente-masivo.component';
import { GestionServiciosComponent } from './pages/gestion-servicios/gestion-servicios.component';
import { CrearServicioComponent } from './pages/crear-servicio/crear-servicio.component';
import { ProfesionalesServicioComponent } from './pages/profesionales-servicio/profesionales-servicio.component';
import { CargarProfesionalesMasivoComponent } from './pages/profesionales-servicio/cargar-profesionales-masivo/cargar-profesionales-masivo.component';
import { CargarSesionesMasivoComponent } from './pages/profesionales-servicio/cargar-sesiones-masivo/cargar-sesiones-masivo.component';
import { ListaSesionesPorProfesionalesComponent } from './pages/lista-sesiones-por-profesionales/lista-sesiones-por-profesionales.component';
import { DetalleSesionPorProfesionalComponent } from './pages/detalle-sesion-por-profesional/detalle-sesion-por-profesional.component';

const routes: Routes = [

 // { path: '', component: AdminComponent },




  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'lista-comunidad', pathMatch: 'full' },
      { path: 'lista-comunidad', component: ListaComunidadComponent },
      { path: 'registro-comunidad', component: RegistroComunidadComponent },
      { path: 'editar-comunidad/:id', component: EditarComunidadComponent },
      { path: 'lista-cliente', component: ListaClienteComponent},
      { path: 'servicios-por-comunidad/:id',component:ServiciosPorComunidadComponent},
      { path: 'nuevo-servicio-por-comunidad/:id',component:NuevoServicioPorComunidadComponent},
      { path: 'cargar-cliente-masivo',component:CargarClienteMasivoComponent},
      { path: 'gestion-servicios', component: GestionServiciosComponent },
      { path: 'crear-servicio', component: CrearServicioComponent },
      { path: 'editar-servicio/:id', component: CrearServicioComponent },
      { path: 'servicio/:id/profesionales', component: ProfesionalesServicioComponent },
      { path: 'cargar-profesionales-masivo', component: CargarProfesionalesMasivoComponent },
      { path: 'cargar-sesiones-masivo', component: CargarSesionesMasivoComponent },
      { path: 'lista-sesiones-por-profesionales/:id', component: ListaSesionesPorProfesionalesComponent},
      {path: 'detalle-sesion-por-profesional/:id', component:DetalleSesionPorProfesionalComponent}
  
      // otras rutas como dashboard, usuarios, etc.
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
