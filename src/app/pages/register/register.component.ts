import { Component } from '@angular/core';
import { FormGroup, FormControl , Validators, FormBuilder} from '@angular/forms';
import { UsuariosService } from 'src/app/Services/usuarios.service';
 import { Router } from '@angular/router';
import { Usuarios } from 'src/app/model/usuarios';
 @Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

   
  pokemonSelect?:any;
 
  registerForm!: FormGroup;
 
  constructor(
   
    public userSer: UsuariosService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      nombres: ['', Validators.required],
      direccion: ['', Validators.required],
    });
   }

  guardar(event: Event): void {
   
  
    if (this.registerForm.valid) {
      const usuario: Usuarios = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        nombres: this.registerForm.value.nombres,
        direccion: this.registerForm.value.direccion,
        idUsuario: 0,
        status: '',
        roles: []
      };
      this.userSer.registrarse(usuario).subscribe(
        {
          next: () => {
            alert('Usuario creado');
            this.router.navigate(['/login']);
            this.registerForm.reset();
          },
          error: (error) => {
            if (error.status === 400) {
            alert(error.error.message);
            } else {
              alert('Ocurrió un error en el servidor');
            }
          },
          complete: () => {
            console.log('Observable completed');
          }
        });
    } else {
      alert('Debe completar todos los campos');
    }
  }
  
}
