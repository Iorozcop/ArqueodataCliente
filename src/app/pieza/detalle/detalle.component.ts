import { Component, Input, OnInit } from '@angular/core';
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
  
  constructor(public modalService: ModalService) { }

  ngOnInit(): void {}

  // cierra la ventana modal
  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
  }

}
