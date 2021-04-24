import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})

/* ESTE AUTH.GUARD SIRVE PARA INTERCEPTAR Y VER SI ESTA LOGUEADO */

export class AuthGuard implements CanActivate {

  constructor(private authService: AutenticacionService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.authService.isAuthenticated()){
        //si está expirado cerramos sesión y redirigimos a login
        if(this.isTokenExpirado()){
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No tienes acceso a este recurso'
      });
      this.router.navigate(['/login']);
    return false;
  }

  isTokenExpirado():boolean{
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosToken(token);
    //obtiene la fecha en milisegundos y la dividimos entre 1000 para tenerla en segundos.
    let now = new Date().getTime() /1000;
    //el atributo exp es donde esta almacenala la fecha de caducidad en el payload.
    if(payload.exp < now){
      return true;
    }
    return false;
  }
  
}
