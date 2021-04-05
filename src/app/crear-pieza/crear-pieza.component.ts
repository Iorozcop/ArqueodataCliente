import { Component, OnInit } from '@angular/core';
import { Pieza } from '../pieza/pieza';
import { PiezasService } from '../servicios/piezas.service';

@Component({
  selector: 'app-crear-pieza',
  templateUrl: './crear-pieza.component.html',
  styleUrls: ['./crear-pieza.component.css']
})
export class CrearPiezaComponent implements OnInit {

  public pieza:Pieza= new Pieza();

  constructor(private piezaService: PiezasService) { }

  ngOnInit(): void {
  }

  crear(){}

}
