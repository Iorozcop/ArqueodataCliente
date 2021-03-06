import { Injectable } from '@angular/core';
import { Pieza } from '../pieza/pieza';
import { Observable, throwError } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { URL_BACK } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class PiezasService {
  private urlEndPoint:string = URL_BACK + '/api/piezas';

  constructor(private http:HttpClient,
    private router: Router) { }

  // Trae pieza según id
  getPieza(id: number): Observable<Pieza> {
    return this.http.get<Pieza>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/piezas']);
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Error'
        })
        return throwError(e);
      })
    );
  }

  // Trae todas las piezas registradas con paginación
  getPiezasP(page:number): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + '/page/' + page);
  }

  // Trae todas las piezas registradas
  getPiezas(): Observable<Pieza[]> {
    return this.http.get<Pieza[]>(this.urlEndPoint);
  }

  // Crea una nueva pieza
  create(pieza:Pieza) :Observable<any>{
    return this.http.post<any>(this.urlEndPoint, pieza).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        console.log(e.error.mensaje);
        this.router.navigate(['/piezas']);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Error'
        })
        return throwError(e);
      })
    )
  }

  // Edita una pieza
  update(pieza: Pieza) :Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${pieza.id}`, pieza).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Algo salió mal'
        })
        return throwError(e);
      })
    )
  }

  // Elimina una campaña
  delete(id:number):Observable<Pieza>{
  return this.http.delete<Pieza>(`${this.urlEndPoint}/${id}`)
  }

  // Sube una imagen
  subirFoto(archivo: File, id: any): Observable<Pieza> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
      map((response:any)=> response.pieza as Pieza),
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'Error'
        })
        return throwError(e);
      })
    )
  }

  // Busca piezas
  buscaPiezas(pieza: Pieza): Observable<any[]>{
    return this.http.post<any[]>(`${this.urlEndPoint}/search`,pieza).pipe(
      catchError(e => {
        if(e.status == 404){
          return throwError(e);
        }
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: 'No existen piezas que cumplan estos criterios de búsqueda'
        })
        return throwError(e);
      })
    );
  }
}
