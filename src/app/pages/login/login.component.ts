import { Component } from '@angular/core';
import { FormControl, FormGroup , FormBuilder, Validators} from '@angular/forms';
import { UsuariosService } from 'src/app/Services/usuarios.service';

import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { LoginDto } from 'src/app/model/LoginDto';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  poke: any;

  constructor(
    public fb: FormBuilder,
    public userSer: UsuariosService,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
  ) {
  
  }



  ngOnInit(): void {
    this.loginForm = this.fb.group({
      
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  guardar(event: Event): void {
    if (this.loginForm.valid) {
      debugger
      const dto = new LoginDto(this.loginForm.value.username, this.loginForm.value.password);
      debugger
      this.authService.login(dto).subscribe({
        next: (data) => {
          debugger
          this.tokenService.setToken(data.accessToken);
          debugger
          this.authService.setPersonaLogeada(JSON.stringify(data));
        },
        error: (error) => { alert(`error: Usuario o contrasena incorrectas`); },
        complete: () => {
          sessionStorage.setItem("isLoggedIn", 'true');
          window.location.replace('/');
        }
      });
    }else{
      alert('Debe completar todos los campos');
    }
  
  }

}
