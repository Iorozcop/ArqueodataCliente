import { Component, Input, OnInit } from '@angular/core';
import { Pieza } from '../pieza';
import { PiezasService } from '../../servicios/piezas.service';
import Swal from 'sweetalert2';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-pieza',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  
  @Input() pieza!: Pieza;
  public fotoSeleccionada!: File | null;
  
  constructor(private piezaService: PiezasService,
              public modalService: ModalService) { }

  ngOnInit(): void {}

  seleccionarFoto(event:any) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada!.type.indexOf('image') < 0) {
      Swal.fire({
        icon: 'error',
        title: 'El archivo debe ser del tipo imagen',
        text: 'Error'
      })
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if (!this.fotoSeleccionada) {
      Swal.fire({
        icon: 'error',
        title: 'Debe seleccionar una foto',
        text: 'Error'
      })
    } else {
      this.piezaService.subirFoto(this.fotoSeleccionada, this.pieza.id)
        .subscribe(pieza => {
          this.pieza = pieza;
        });
        this.modalService.notificarUpload.emit(this.pieza);
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
  }

}
