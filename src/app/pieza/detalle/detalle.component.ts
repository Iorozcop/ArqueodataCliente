import { Component, Input, OnInit } from '@angular/core';
import { URL_BACK } from 'src/config/config';
import { Pieza } from '../pieza';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-pieza',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() pieza!: Pieza;
  public fotoSeleccionada!: File | null;
  public urlEndPoint:string = URL_BACK;
  
  constructor(public modalService: ModalService) { }

  ngOnInit(): void {}

  // Cierra la ventana modal
  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
  }

}
