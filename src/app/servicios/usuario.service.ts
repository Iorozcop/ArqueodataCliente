import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint:string = 'http://localhost:8449/api/usuarios';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient,
              private router: Router) { }

  private isNoAutorizado(e:any):boolean{
    if(e.status == 401 || e.status == 403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  //trae todos los usuarios registrados
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlEndPoint);
  }

  //crea un nuevo usuario
  create(usuario:Usuario) :Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers:this.httpHeaders})
  }
}
