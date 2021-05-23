import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';


/** ESTE TOKEN INTERCEPTOR ES PARA ENVIAR EL TOKEN EN LAS CABCERAS HTTP */

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AutenticacionService){}
    
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

      let token = this.authService.token;
      if(token != ''){
        //esto es un clon del request anterior al que le vamos a añadir el token
        const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
        // console.log('TokenInterceptor => Bearer ' + token);
        return next.handle(authReq);
      }
    return next.handle(req);
  }
}
