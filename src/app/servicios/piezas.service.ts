import { Injectable } from '@angular/core';
import { Pieza } from '../pieza/pieza';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PiezasService {
  private urlEndPoint:string = 'http://localhost:8449/api/piezas';

  constructor(private http:HttpClient) { }

  getPiezas(): Observable<Pieza[]> {
    return this.http.get<Pieza[]>(this.urlEndPoint);
  }
}
