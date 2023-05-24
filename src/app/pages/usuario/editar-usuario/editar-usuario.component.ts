import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/model/usuarios';
import { Roles } from 'src/app/model/Roles';
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {


  pokemonSelect?: any;
  userForm!: FormGroup;
  usuario!: Usuarios;
  rol: Roles[]=[]; 

  @Input() idUsuarioEditar!: Usuarios;
  id = localStorage.getItem('idUsuario');
 
 


  nombres: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  direccion: string = "";
  status: string = "";
  roles: string = "";

  constructor(

    public userSer: UsuariosService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {

    this.userForm = this.formBuilder.group({

      nombres: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      roles: new FormControl('', [Validators.required]),
    });
    this.userSer.traerRoles().subscribe({ //esta funcion traigo los roles
      next: (data :Roles[] )=> {
        this.rol =data;
      },
      error: (error) =>{
        console.log("Ocurrio un error cuando se trae los usuarios");
      }
    });
    this.userSer.obtenerUsuario(+this.id!).subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (error) => { console.log(`Ocurrió un error al traer el usuario ${error.status}`); },
      complete: () => {
        this.userForm.patchValue({
          username: this.usuario.username,
          email: this.usuario.email,
          direccion: this.usuario.direccion,
          nombres: this.usuario.nombres,
          status: this.usuario.status,
          roles: this.usuario.roles,
        });
      }
    });
  }

  volver() {
    this.router.navigate(['usuario']);
  }
  toJson(value: any) {
    return JSON.stringify(value);
  }
  guardar(event : Event) {
    if (this.userForm.valid) {
      const usuario: Usuarios= {
        idUsuario: this.usuario.idUsuario,
        nombres: this.userForm.value.nombres,
        direccion: this.userForm.value.direccion,
        status: this.userForm.value.status,
        roles: [JSON.parse(this.userForm.value.roles)],
        username: '',
        email: '',
        password: ''
      };
      console.log(usuario);
      this.userSer
        .updateUsuario(usuario.idUsuario!, usuario)
        .subscribe((data) => {
          this.usuario = data;
          alert('Se actualizo con exito');
          this.router.navigate(['usuario']);
        });
    } else {
      alert('Debe completar todos los campos');
    }
  }

}
