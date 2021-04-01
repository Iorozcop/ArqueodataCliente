import { Component, OnInit } from '@angular/core';
import { Pieza } from './pieza';
import { PiezasService } from '../servicios/piezas.service';
import { PIEZAS } from './pieza.json';


@Component({
  selector: 'app-pieza',
  templateUrl: './pieza.component.html',
  styleUrls: ['./pieza.component.css']
})
export class PiezaComponent implements OnInit {

  piezas: Pieza[] = [];
  
  constructor(private piezaService: PiezasService) { }

  ngOnInit(): void {
    
    this.piezaService.getPiezas().subscribe(
      piezas => this.piezas = piezas
    );
    
  }

}
