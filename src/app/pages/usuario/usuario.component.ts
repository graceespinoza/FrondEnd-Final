import { Component } from '@angular/core';
import {  FormControl, FormGroup, NgForm, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { Roles } from 'src/app/model/Roles';
import { Usuarios } from 'src/app/model/usuarios';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {


  usuarioselect!: Usuarios;
  usuarioIdSelected!: number;
  roles?:Roles;

  pokemonSelect?:any;

  constructor(
   
    public userSer: UsuariosService,
    private router: Router,
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
      this.userSer.listar()
   //   .subscribe((data: Usuarios[]) => {
     //   this.usuarios = data.filter((user: Usuarios) => user.status);
     // });
  }
  delete(id: number) {
    this.userSer.eliminar(id)
    .subscribe((data: Usuarios[]) => {
      this.usuarios = data.filter((user: Usuarios) => user.status);
    });
  }
  onUsuarioGuardado(user: Usuarios) {
    this.usuarios.push(user);
  }
}
