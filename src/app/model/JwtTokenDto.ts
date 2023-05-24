export class JwtTokenDto {
    username: string;
    password: string;
    idUsuario: number;
    nombres: string;
    direccion: string;
    status: string;
    roles: string[];
    type: string;
    token: string;

    constructor(username: string, password: string, idUsuario: number, nombres: string, direccion: string, status: string, roles: string[], type: string, token: string) {
        this.username = username;
        this.password = password;
        this.idUsuario = idUsuario;
        this.nombres = nombres;
        this.direccion = direccion;
        this.status = status;
        this.roles = roles;
        this.type = type;
        this.token = token;
    }
}

