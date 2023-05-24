import { Component } from '@angular/core';
import { FormControl, FormGroup , FormBuilder, Validators} from '@angular/forms';
import { UsuariosService } from 'src/app/Services/usuarios.service';

import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userForm!: FormGroup;

  poke: any;

  constructor(
    public fb: FormBuilder,
    public userSer: UsuariosService,
    private router: Router,
  ) {
  
  }



  ngOnInit(): void {
    this.userForm = this.fb.group({
      
      email: ['', Validators.required],
      contrasena: ['', Validators.required]
    });;

    this.userSer.listar().subscribe(resp => {
      this.poke = resp;
      console.log(resp);
    },
      error => { 
        console.error(error);
       }

    )
  }
  guardar(event: Event): void {
    event.preventDefault();
   
    if(this.userForm.valid){
      const value = this.userForm.value;
        this.userSer.crearUsuario(this.userForm.value).subscribe(resp => {

          this.userForm.reset();
          this.poke.push(resp);
      
        },
        error => {
          console.error(error)
        });
        
  }

}

}
