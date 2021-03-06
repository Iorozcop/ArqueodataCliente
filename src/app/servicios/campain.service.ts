import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Campain } from '../campain/campain';
import { Router } from '@angular/router';
import { catchError} from 'rxjs/operators';
import Swal from 'sweetalert2'
import { URL_BACK } from 'src/config/config';

@Injectable({
    providedIn: 'root'
})

export class CampainService {

    private urlEndPoint:string = URL_BACK + '/api/piezas/campains'

    constructor(private http:HttpClient,
                private router: Router
                ) { }

  // Trae todas las campañas registradas con paginación
  getCampainsP(page:number): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + '/page/' + page);
  }

  // Trae todas las campañas registradas
  getCampains(): Observable<Campain[]> {
    return this.http.get<Campain[]>(this.urlEndPoint);
  }

  // Crea una nueva campaña
  create(campain:Campain) :Observable<Campain>{
    return this.http.post<Campain>(this.urlEndPoint, campain).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        console.log(e.error.mensaje);
        this.router.navigate(['/piezas/campains']);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Puede que la campaña ya exista en la BBDD'
        })
        return throwError(e);
      })
    )
  }

  // Trae campañas por id
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

  // Edita una campaña
  update(campain: Campain) :Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${campain.id}`, campain).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
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

  // Elimina una campaña
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