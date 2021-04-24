import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import Swal from 'sweetalert2';
import { catchError} from 'rxjs/operators';
import { Router } from '@angular/router';


/** ESTE AUTH INTERCEPTOR ES PARA CONTROLAR LAS RESPUESTAS A NUESTRAS PETICIONES */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AutenticacionService,
              private router: Router){}
    
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      
    return next.handle(req).pipe(
      catchError(e => {
        if(e.status == 401){
          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }
          this.router.navigate(['/login'])
        }
        
        if(e.status == 403){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No tienes acceso a este recurso'
          });
          this.router.navigate(['/piezas']);
        }
        return throwError(e);
      }
      )
    );
  }
}
