import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PruebaEspinoza';

  constructor(private router:Router) { }

  Listar(){
    this.router.navigate(["usuario"]);
  }

  Nuevo(){
    this.router.navigate(["usuario","nuevo"]);
  }
}
