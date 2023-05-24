import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { Roles } from 'src/app/model/Roles';
import { Usuarios } from 'src/app/model/usuarios';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {
  @Output() usuarioGuardado = new EventEmitter<Usuarios>();

  form!: FormGroup;
  roles: Roles[] = [];

  constructor(
    private userService: UsuariosService,
    private formBuilder: FormBuilder
  ) {}

  toJson(value: any) {
    return JSON.stringify(value);
  }
  ngOnInit() {
    this.userService.traerRoles().subscribe({
      next: (data: Roles[]) => {
        this.roles = data;
      },
      error:()=>{console.log('Ocurrió un error vuelva intentarlo');},
      complete:() => {}
    });
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      nombres: ['', Validators.required],
      direccion: ['', Validators.required],
      status: ['', Validators.required],
      roles: ['', Validators.required],
    });
  }
  guardar() {
    if (this.form.valid) {
      const usuario: Usuarios = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        nombres: this.form.value.nombres,
        direccion: this.form.value.direccion,
        status: this.form.value.status,
        roles: [JSON.parse(this.form.value.roles)],
        idUsuario: 0
      };
      this.userService.crearUsuario(usuario).subscribe({
        next:() => {
          this.usuarioGuardado.emit(usuario);
          alert('Usuario creado exitosamente');
        },
        error:()=>{
          alert('Ocurrió un error');
        },
        complete:() => {}
      });
    } else {
      alert('Debe completar todos los campos');
    }
  }
  emitirEventoUsuarioGuardado(usuario: Usuarios) {
    this.usuarioGuardado.emit(usuario);
  }
}
