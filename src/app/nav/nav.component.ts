import { Component } from '@angular/core';
import { TokenService } from '../Services/token.service';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { Usuarios } from '../model/Usuarios';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isLogged : boolean = false;
  usuarioLogged! :Usuarios|null ;
  isAdmin: boolean = false;
  isMod: boolean = false;

  constructor(
    private tokenService:TokenService, 
    private authService: AuthService,
     private router: Router) { }

  
  ngOnInit(){
    this.isAdmin = this.tokenService.isAdmin();//Cambia la variable para usarla en el html
    this.isMod = this.tokenService.isMod();
    this.isLogged = this.tokenService.islogged();
    this.usuarioLogged = JSON.parse(this.authService.traerPersonaLogeada());
  }

  logout() {
    this.tokenService.logout();
    window.location.reload();
    this.router.navigate(['/login']);
  }

}
