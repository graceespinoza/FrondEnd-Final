import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDto } from "../model/LoginDto";
import { Observable } from "rxjs";
import { JwtTokenDto } from "../model/JwtTokenDto";
import { Usuarios } from "../model/Usuarios";
import * as CryptoJS from 'crypto-js';



const encryptionKey = 'aes2001ja';
const PERSONA_LOGG = 'logged-persona';

@Injectable({
    providedIn: "root",
})
export class AuthService {
    usuario!: Usuarios;

    constructor(private http: HttpClient) { }

    login(dto: LoginDto): Observable<JwtTokenDto> {
        return this.http.post<JwtTokenDto>("http://localhost:8080/app/login/signin", dto);
    }

    public setPersonaLogeada(usuario: any): void {
        const encryptedUsuario = CryptoJS.AES.encrypt(JSON.stringify(usuario), encryptionKey).toString();
        localStorage.setItem(PERSONA_LOGG, encryptedUsuario);
    }

    public getPersonaLogeada(): string | null { 
        const encryptedUsuario = localStorage.getItem(PERSONA_LOGG);
        if (encryptedUsuario) {
            return encryptedUsuario;
        }
        return null;
    }

    public traerPersonaLogeada() {
        const encryptedUsuario = this.getPersonaLogeada();
        if (encryptedUsuario != null) {
            const decryptedUsuario = CryptoJS.AES.decrypt(encryptedUsuario, encryptionKey).toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedUsuario);
        }
        return null;
    }

}