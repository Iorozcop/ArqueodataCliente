import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;

  constructor(private usuarioService: UsuarioService,
              private router:Router,
              private autService: AutenticacionService) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.autService.isAuthenticated()){
      Swal.fire('Ya has iniciado sesión');
      this.router.navigate(['/piezas']);
    }
  }

  //comprueba que existe en la BBDD
  login():void{
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Email o pass vacíos!'
      })
      return;}

    this.autService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.autService.guardarUsuario(response.access_token);
      this.autService.guardarToken(response.access_token);
      this.router.navigate(['/inicio']);
    }, err =>{
      if(err.status == 400){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Usuario o clave incorrectas!'
        })
      }
    })
  }
}
