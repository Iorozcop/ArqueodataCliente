import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from '../servicios/usuario.service';
import Swal from 'sweetalert2'
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[]=[];

  constructor(private usuarioService: UsuarioService,
              public authService: AutenticacionService) { }

  ngOnInit(): void {

    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }

  delete(usuario:Usuario):void{
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Vas a eliminar a ${usuario.username} de la base de datos`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(usuario.id).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(user => user !== usuario)
            Swal.fire(
            '¡Eliminado!',
            'El usuario ha sido eliminado',
            'success'
        )
          }
        )
        
      }
    })
  }

}
