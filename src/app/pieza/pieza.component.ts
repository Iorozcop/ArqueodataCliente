import { Component, OnInit } from '@angular/core';
import { Pieza } from './pieza';
import { PiezasService } from '../servicios/piezas.service';
import Swal from 'sweetalert2'
import { AutenticacionService } from '../servicios/autenticacion.service';
import { ModalService } from './detalle/modal.service';
import { ActivatedRoute } from '@angular/router';
import { URL_BACK } from 'src/config/config';


@Component({
  selector: 'app-pieza',
  templateUrl: './pieza.component.html',
  styleUrls: ['./pieza.component.css']
})
export class PiezaComponent implements OnInit {

  piezas: Pieza[] = [];
  piezaSeleccionada!: Pieza;
  paginador: any;
  entidad: string='piezas';
  public urlEndPoint:string = URL_BACK;
  
  constructor(private piezaService: PiezasService,
              public authService: AutenticacionService,
              public modalService: ModalService,
              private activatedRoute: ActivatedRoute
              ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params=>{
      
      let page:number = +params.get('page');
      
      if(!page){
        page = 0;
      }

      this.piezaService.getPiezasP(page).subscribe(
      response => {
        this.piezas = response.content as Pieza[];
        this.paginador = response;
      });
    })
  }

  // Elimina pieza
  delete(pieza:Pieza):void{
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Vas a eliminar la pieza ${pieza.util} de la base de datos`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.piezaService.delete(pieza.id).subscribe(
          response => {
            this.piezas = this.piezas.filter(piez => piez !== pieza)
            Swal.fire(
            '¡Eliminado!',
            'La pieza ha sido eliminada',
            'success'
            )
          }
        )
      }
    })
  }

  // Abre modal
  abrirModal(pieza:Pieza){
    this.piezaSeleccionada = pieza;
    this.modalService.abrirModal();
  }
}
