import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint:string = 'http://localhost:8449/api/usuarios';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  //trae todos los usuarios registrados
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlEndPoint);
  }

  //crea un nuevo usuario
  create(usuario:Usuario) :Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers:this.httpHeaders})
  }
}
