import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(private usuarioService :UsuarioService,
              private router:Router) { }

  ngOnInit(): void {
  }

  crear() :void {
    this.usuarioService.create(this.usuario).subscribe(
      response => this.router.navigate(['/usuarios'])
    )
  }

}
