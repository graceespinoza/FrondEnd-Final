import { NgModule } from '@angular/core';
import { RouterModule, Routes,PreloadAllModules } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { EditarUsuarioComponent } from './pages/usuario/editar-usuario/editar-usuario.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
const routes: Routes = [
 {
  
    path: '',
    component: HomeComponent ,
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
  },
  {
    path: 'usuario/editar',
    component: EditarUsuarioComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  } 
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
