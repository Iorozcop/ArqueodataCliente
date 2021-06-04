import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../usuario/usuario';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators'
import Swal from 'sweetalert2'
import { URL_BACK } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint:string = URL_BACK +'/api/usuarios';

  constructor(private http:HttpClient,
              private router: Router) { }

  // Trae todos los usuarios registrados
  getUsuarios(page:number): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + '/page/' + page);
  }

  // Crea un nuevo usuario
  create(usuario:Usuario) :Observable<any>{
    return this.http.post<any>(this.urlEndPoint, usuario).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        return throwError(e);
      })
    )
  }

  // Trae usuario por id
  getUsuario(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401){
          this.router.navigate(['/usuarios']);
        }
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al editar',
          text: e.error.mensaje
        })
        return throwError(e);
      })
    )
  }

  // Edita un usuario
  update(usuario: Usuario) :Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.id}`, usuario).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Puede que el nombre o el email ya existan en la BBDD'
        })
        return throwError(e);
      })
    )
  }

  // Elimina un usuario
  delete(id: number):Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Inténtelo de nuevo'
        })
        return throwError(e);
      })
    )
  }
}
