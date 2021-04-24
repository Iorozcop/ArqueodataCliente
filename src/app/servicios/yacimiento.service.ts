import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Yacimiento } from '../yacimiento/yacimiento';
import { AutenticacionService } from './autenticacion.service';
import { Router } from '@angular/router';
import { catchError} from 'rxjs/operators';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
})

export class YacimientoService {
    private urlEndPoint:string = 'http://localhost:8449/api/piezas/yacimientos';
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    constructor(private http:HttpClient, 
                private authService: AutenticacionService,
                private router: Router,) { }

    private agregarAuthHeader(){
      let token = this.authService.token;
      if(token != null){
        //el método append sirve para añadir atributo
        return this.httpHeaders.append('Authorization','Bearer ' + token);
      }
      return this.httpHeaders;
    }

  //trae todos los yacimientos registrados
  getYacimientos(): Observable<Yacimiento[]> {
    return this.http.get<Yacimiento[]>(this.urlEndPoint);
  }

  //crea un nuevo yacimiento
  create(yacimiento:Yacimiento) :Observable<Yacimiento>{
    return this.http.post<Yacimiento>(this.urlEndPoint, yacimiento, {headers:this.agregarAuthHeader()}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        this.router.navigate(['/piezas']);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Puede que el yacimiento ya existan en la BBDD'
        })
        //throwError es para retornar el error pero tipo observable
        return throwError(e);
      })
    )
  }

  //trae yacimiento por id
  getYacimiento(id:number):Observable<Yacimiento>{
    return this.http.get<Yacimiento>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401){
          this.router.navigate(['/piezas']);
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

  //edita un usuario
  update(yacimiento: Yacimiento) :Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${yacimiento.id}`, yacimiento).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Puede que el yacimiento ya exista en la BBDD'
        })
        return throwError(e);
      })
    )
  }

  //elimina un yacimiento
  delete(id: number):Observable<Yacimiento>{
    return this.http.delete<Yacimiento>(`${this.urlEndPoint}/${id}`, {headers:this.agregarAuthHeader()}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Puede que el yacimiento esté asociado a piezas existentes en la BBDD'
        })
        return throwError(e);
      })
    )
  }
}