import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  {Observable} from 'rxjs';
import { Usuarios } from '../model/usuarios';
import { Roles } from '../model/Roles';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private APIS = "http://localhost:8080/app/usuario"
  private API = "http://localhost:8080/app/login"
  constructor(
    private httpCliente: HttpClient

  ) { }

  public listar(){
    return this.httpCliente.get<Usuarios>(this.APIS);
  }

public eliminar(id: number) {
  return this.httpCliente.put<Usuarios[]>(this.APIS + "/eliminar/" ,id);
}
public crearUsuario(usuario: Usuarios){
  //http://localhost:8080/api/usuario
  return this.httpCliente.post<Usuarios>(this.APIS, usuario);
}
public registrarse(usuario: Usuarios){
  return this.httpCliente.post<Usuarios>(this.API +"/signup", usuario);
}
public obtenerUsuario(id: number){
  //http://localhost:8080/api/usuario/${id}`
  return this.httpCliente.get<Usuarios>(`http://localhost:8080/app/usuario/${id}`);
}
public updateUsuario(id:number ,usuario: Usuarios){
  return this.httpCliente.put<Usuarios>(`http://localhost:8080/app/usuario/editar/${id}`, usuario);
}
public traerRoles(){
  return this.httpCliente.get<Roles[]>(`http://localhost:8080/api/usuario/roles`);
}
}


