import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';


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
  }

  //comprueba que existe en la BBDD
  login():void{
    if(this.usuario.username == null || this.usuario.password == null){
      alert('Error al iniciar sesión, email o pass vacios'); 
      return;}

    this.autService.login(this.usuario).subscribe(response => {
      console.log(response);
      this.router.navigate(['/piezas']);
    })
  }
}
