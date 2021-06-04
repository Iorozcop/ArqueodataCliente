import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public errores: string[];

  constructor(private usuarioService :UsuarioService,
              private router:Router) { }

  ngOnInit(): void {}

  // Crea usuarios
  crear() :void {
    this.usuarioService.create(this.usuario).subscribe(
      json => { 
        this.router.navigate(['/login'])
        Swal.fire(
          'Usuario creado',
          `Usuario ${json.usuario.username} creado con éxito`,
          'success'
        )
      },
      err => {
        if(err.status == 500){
          console.log(err.error.mensaje);
          Swal.fire({
            icon: 'error',
            title: err.error.mensaje,
            text: 'Puede que el nombre o el email ya existan en la BBDD'
          })
        }
        this.errores = err.error.errors as string[];
        console.error("codigo del error: " + err.status);
        console.error(err.console.error.errors);
      }
    )
  }

}
