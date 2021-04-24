import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  
  private _usuario: Usuario = this.usuario;
  private _token: string='';


  constructor(private http: HttpClient) { }

  // OBTIENE USUARIO ACTUAL
  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      //lo convierte a objeto
      this._usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}') as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  // OBTIENE TOKEN ACTUAL
  public get token(){
    if(this._token != ''){
      return this._token;
    }else if(this._token == '' && sessionStorage.getItem('token') != ''){
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return null;
  }

  // LOGIN
  login(usuario:Usuario):Observable<any>{
    const urlEndpoint = 'http://localhost:8449/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders =  new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 
    'Authorization': 'Basic ' + credenciales});

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());

    return this.http.post<any>(urlEndpoint, params.toString(), {headers:httpHeaders});
  }

  // GUARDA EL USUARIO LOGUEADO EN EL STORAGE
  guardarUsuario(accessToken: string):void{
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.username = payload.user_name;
    this._usuario.email = payload.email;
    this._usuario.roles = payload.authorities;
    //stringify convierte objeto json a string
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  // GUARDA EL TOKEN DEL USUARIO EN EL STORAGE
  guardarToken(accessToken: string):void{
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  // OBTIENE DATOS DEL USUARIO A TRAVÉS DEL TOKEN
  obtenerDatosToken(accessToken: any):any{
    if(accessToken != ''){
      //saca mediante un split los datos y luego lo parsea a JSON
      return JSON.parse(atob(accessToken.split(".")[1]))
    }
    return null;
  }

  // COMPRUEBA SI ESTÁ AUTENTICADO
  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token)

    if(payload != null && payload.user_name && payload.user_name.length>0){
      return true;
    }return false;
  }

  // COMPRUEBA SI TIENE UN ROL DETERMINADO
  hasRole(role:string): boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }

  // CIERRA SESIÓN
  logout(){
    this._token = '';
    this._usuario = new Usuario;
    sessionStorage.clear();
  }

}
