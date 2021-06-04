import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../usuario/usuario';
import { URL_BACK } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  
  private _usuario: Usuario = this.usuario;
  private _token: string='';


  constructor(private http: HttpClient) { }

  // Obtiene usuario actual
  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}') as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  // Obtiene token actual
  public get token(){
    if(this._token != ''){
      return this._token;
    }else if(this._token == '' && sessionStorage.getItem('token') != ''){
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return null;
  }

  // Login
  login(usuario:Usuario):Observable<any>{
    const urlEndpoint = URL_BACK + '/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders =  new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 
    'Authorization': 'Basic ' + credenciales});

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post<any>(urlEndpoint, params.toString(), {headers:httpHeaders});
  }

  // Guarda el usuario logueado en el storage
  guardarUsuario(accessToken: string):void{
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.username = payload.user_name;
    this._usuario.email = payload.email;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  // Guarda el token del usuario en el storage
  guardarToken(accessToken: string):void{
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  // Obtiene datos del usuario a través del token
  obtenerDatosToken(accessToken: any):any{
    if(accessToken != ''){
      return JSON.parse(atob(accessToken.split(".")[1]))
    }
    return null;
  }

  // Comprueba si está autenticado
  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token)

    if(payload != null && payload.user_name && payload.user_name.length>0){
      return true;
    }return false;
  }

  // Comprueba si tiene un rol determinado
  hasRole(role:string): boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }

  // Cierra sesión
  logout(){
    this._token = '';
    this._usuario = new Usuario;
    sessionStorage.clear();
  }

}
