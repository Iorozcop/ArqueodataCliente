import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Campain } from '../campain/campain';
// import { AutenticacionService } from './autenticacion.service';
import { Router } from '@angular/router';
import { catchError} from 'rxjs/operators';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
})

export class CampainService {
    private urlEndPoint:string = 'http://localhost:8449/api/piezas/campains';
    // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    constructor(private http:HttpClient,
                private router: Router
                ) { }

  //trae todas las campañas registradas
  getCampains(): Observable<Campain[]> {
    return this.http.get<Campain[]>(this.urlEndPoint);
  }

  //crea una nueva campaña
  create(campain:Campain) :Observable<Campain>{
    return this.http.post<Campain>(this.urlEndPoint, campain).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        this.router.navigate(['/piezas/campains']);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Puede que la campaña ya exista en la BBDD'
        })
        //throwError es para retornar el error pero tipo observable
        return throwError(e);
      })
    )
  }

  //trae campañas por id
  getCampain(id:number):Observable<Campain>{
    return this.http.get<Campain>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401){
          this.router.navigate(['/piezas/campains']);
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

  //edita una campaña
  update(campain: Campain) :Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${campain.id}`, campain).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Puede que la campaña ya exista en la BBDD'
        })
        return throwError(e);
      })
    )
  }

  //elimina una campaña
  delete(id: number):Observable<Campain>{
    return this.http.delete<Campain>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Puede que la camapaña esté asociada a piezas existentes en la BBDD'
        })
        return throwError(e);
      })
    )
  }

}