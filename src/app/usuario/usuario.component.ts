import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from '../servicios/usuario.service';
import Swal from 'sweetalert2'
import { AutenticacionService } from '../servicios/autenticacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuariosList: Usuario[]=[];
  paginador: any;
  entidad: string='usuarios';

  constructor(private usuarioService: UsuarioService,
              public authService: AutenticacionService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  
    this.activatedRoute.paramMap.subscribe(params=>{
      let page:number = +params.get('page');
      
      if(!page){
        page = 0;
      }

      this.usuarioService.getUsuarios(page).subscribe(
      response => {
        this.usuariosList = response.content as Usuario[];
        this.paginador = response;
      });
    })
    
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
            this.usuariosList = this.usuariosList.filter(user => user !== usuario)
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
