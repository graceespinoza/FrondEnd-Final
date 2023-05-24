import { Component } from '@angular/core';
import {  FormControl, FormGroup, NgForm, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { Roles } from 'src/app/model/Roles';
import { Usuarios } from 'src/app/model/Usuarios';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {


  usuarioselect!: Usuarios;
  usuarioIdSelected!: number;
  roles?:Roles;

  isAdmin: boolean =false;

  page!: number;

  pokemonSelect?:any;

  constructor(
   
    public userSer: UsuariosService,
    private router: Router,
    private tokenService: TokenService
  ) { }

    obtenerUsuario(user:Usuarios){
      this.usuarioselect = user;
    }
  
    obtenerUsuarioId(user: Usuarios){
      localStorage.setItem('idUsuario', user.idUsuario!.toString());
      this.router.navigate(['usuario/editar'])
    }
    usuarios: Usuarios[] = [];
    ngOnInit() {
      if (this.tokenService.isAdmin() || this.tokenService.isMod()) {
        this.isAdmin = this.tokenService.isAdmin(); //Cambia el valor de admin para usarlo en el html
        this.userSer.listar().subscribe({
          next: (data: Usuarios[]) => {
            this.usuarios =data.filter((user : Usuarios) =>
            user.status);
            
          },
          error: (error) =>{
            console.log("Ocurrio un error");
            this.tokenService.logout();
            window.location.replace('/login');

          },
          complete: () => {},
        });
      }else{
        this.router.navigate(['']);
      }
         
         
        
    }
  delete(id: number) {
    this.userSer.eliminar(id).subscribe ({
      next:  (data: Usuarios[]) => {
        this.usuarios = data.filter((user: Usuarios) => user.status);
      },error: (error) =>{
        console.log("Ocurrio un error al eliminar el usuario");
      }
    })
    
  }
  onUsuarioGuardado(user: Usuarios) {
    this.usuarios.push(user);
  }
}
