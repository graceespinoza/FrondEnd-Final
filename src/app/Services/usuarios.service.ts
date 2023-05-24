import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import  {Observable} from 'rxjs';

import { Roles } from '../model/Roles';
import { Usuarios } from '../model/Usuarios';


const jwt = localStorage.getItem('auth-token');
const APIS: string = "http://localhost:8080/app"
 
const headers = new HttpHeaders({
  'Authorization': `Bearer ${jwt}`
});
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
 
  constructor(
    private httpCliente: HttpClient

  ) { }

listar(){
    return this.httpCliente.get<Usuarios[]>(`${APIS}/usuario` , {headers});
  }

eliminar(id: number) {
  return this.httpCliente.put<Usuarios[]>(`${APIS}/usuario/eliminar/${id}`, {headers});
}
crearUsuario(usuario: Usuarios){
  //http://localhost:8080/api/usuario
  return this.httpCliente.post<Usuarios>(`${APIS}/usuario`, usuario,  {headers});
}
registrarseUsuario(usuario: Usuarios){
  return this.httpCliente.post<Usuarios>(`${APIS}/login/signup`, usuario, {headers});
}
obtenerUsuario(id: number){
  //http://localhost:8080/api/usuario/${id}`
  return this.httpCliente.get<Usuarios>(`${APIS}/usuario/${id}` , {headers});
}
updateUsuario(id:number ,usuario: Usuarios){
  return this.httpCliente.put<Usuarios>(`${APIS}/usuario/editar/${id}`, usuario,  {headers});
}
traerRoles(){
  return this.httpCliente.get<Roles[]>(`${APIS}/usuario/roles`,  {headers});
}

}


