import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pieza } from '../pieza/pieza';
import { PiezasService } from '../servicios/piezas.service';
import { CampainService } from '../servicios/campain.service';
import { YacimientoService } from '../servicios/yacimiento.service';
import { Campain } from '../campain/campain';
import { Yacimiento } from '../yacimiento/yacimiento';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-pieza',
  templateUrl: './crear-pieza.component.html',
  styleUrls: ['./crear-pieza.component.css']
})
export class CrearPiezaComponent implements OnInit {

  public pieza:Pieza= new Pieza();
  campains: Campain[] = [];
  yacimientos: Yacimiento[] = [];

  constructor(private piezaService: PiezasService,
              private router:Router,
              private campainService: CampainService,
              private yacimientoService: YacimientoService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.campainService.getCampains().subscribe(campains => this.campains = campains);
    this.yacimientoService.getYacimientos().subscribe(yacimientos => this.yacimientos = yacimientos);
    this.cargarPiezas();
  }

  cargarPiezas():void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.piezaService.getPieza(id).subscribe(
          (pieza) => this.pieza = pieza
        )
      }
    })
  }

  crear(): void{
    this.piezaService.create(this.pieza).subscribe(
      response => this.router.navigate(['/piezas'])
    )
  }

  update():void{
    this.piezaService.update(this.pieza).subscribe(
      pieza => {
        this.router.navigate(['/piezas'])
        Swal.fire(
          'Pieza editada',
          `Pieza editada con éxito`,
          'success'
        )
      }
    )
  }

}
