import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UsuarioComponent } from './pages/usuario/usuario.component';

const routes: Routes=[
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [ AuthGuard ] },
  { path: 'usuario/:id', component: UsuarioComponent, canActivate: [ AuthGuard ] },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: '**', pathMatch: 'full',redirectTo:'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
