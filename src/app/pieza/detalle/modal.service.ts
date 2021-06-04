import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;
  private _notificarUpload = new EventEmitter<any>();

  constructor() { }

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  // Abre modal
  abrirModal() {
    this.modal = true;
  }

  // Cierra modal
  cerrarModal() {
    this.modal = false;
  }

}
