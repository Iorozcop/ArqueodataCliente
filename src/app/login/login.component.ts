import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;

  constructor(private usuarioService: UsuarioService,
              private router:Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  //comprueba que existe el email en la BBDD
  login():void{
    if(this.usuario.email == null || this.usuario.pass == null){
      alert('Error al iniciar sesión, email o pass vacios');
      return;
    }else{
      this.usuarioService.getUsuarios().subscribe(data => {
        data.forEach(element => {
          if(element.email === this.usuario.email){
            this.router.navigate(['/piezas'])
          }
        });
      });
    }
  }
}
