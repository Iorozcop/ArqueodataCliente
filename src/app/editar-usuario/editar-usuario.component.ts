import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public errores: string[];
  
  constructor(private usuarioService :UsuarioService,
              private router:Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  // Carga todos los usuarios
  cargarUsuario():void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.usuarioService.getUsuario(id).subscribe(
          (usuario) => this.usuario = usuario
        )
      }
    })
  }

  // Edita usuario
  update():void{
    this.usuarioService.update(this.usuario).subscribe(
      usuario => {
        this.router.navigate(['/usuarios'])
        Swal.fire(
          'Usuario editado',
          `Usuario editado con éxito`,
          'success'
        )
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error("codigo del error: " + err.status);
      }
    )
  }
}
