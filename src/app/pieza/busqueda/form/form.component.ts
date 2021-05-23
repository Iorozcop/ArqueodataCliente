import { Component, OnInit } from '@angular/core';
import { Campain } from 'src/app/campain/campain';
import { CampainService } from 'src/app/servicios/campain.service';
import { PiezasService } from 'src/app/servicios/piezas.service';
import { YacimientoService } from 'src/app/servicios/yacimiento.service';
import { Yacimiento } from 'src/app/yacimiento/yacimiento';
import { ModalService } from '../../detalle/modal.service';
import { Pieza } from '../../pieza';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public pieza:Pieza= new Pieza;
  piezas: Pieza[]=[];
  campains: Campain[] = [];
  yacimientos: Yacimiento[] = [];
  piezaSeleccionada!: Pieza;
  errores: any[];

  constructor(private piezaService: PiezasService,
              private campainService: CampainService,
              private yacimientoService: YacimientoService,
              private modalService: ModalService) {}
  

  ngOnInit(): void {
    this.campainService.getCampains().subscribe(campains => this.campains = campains);
    this.yacimientoService.getYacimientos().subscribe(yacimientos => this.yacimientos = yacimientos);
  }

  buscar(): void{
    if(this.pieza.campain == null && this.pieza.yacimiento == null && this.pieza.fecha == null && this.pieza.util == null && this.pieza.material == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: '¡Debe introducir algún campo de búsqueda!'
      })
      return;
    }
    this.piezaService.buscaPiezas(this.pieza).subscribe(
      data=>{
        this.piezas = data;
      },
      err => {
        this.piezas=[];
        this.errores = err;
        console.log(err);
      }
    )
  }

  abrirModal(pieza:Pieza){
    this.piezaSeleccionada = pieza;
    this.modalService.abrirModal();
  }
}
