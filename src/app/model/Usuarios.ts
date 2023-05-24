import { Roles } from "./Roles";
export interface Usuarios{
    idUsuario: number,
    nombres:string,
    username:string,
    email:string,
    password:string,
    direccion:string,
    status:string,
    roles:Roles [],
}