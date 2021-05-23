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
  public errores: string[];
  campains: Campain[] = [];
  yacimientos: Yacimiento[] = [];
  isSelected:boolean= false;

  public fotoSeleccionada!: File | null;
  
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

  // carga las piezas existentes en la BBDD

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

  // crea una pieza

  crear(): void{
    this.piezaService.create(this.pieza).subscribe(
      response => {
        this.router.navigate(['/piezas'])
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log("codigo del error: " + err.status);
        console.log(err.console.error.errors);
      }
    )
  }

  // edita una pieza

  update():void{
    if(this.isSelected){
      Swal.fire({
        icon: 'error',
        title: 'Debe subir la imagen primero',
        text: 'Error'
      })
    }else{
      this.piezaService.update(this.pieza).subscribe(
        pieza => {
          this.router.navigate(['/piezas'])
          Swal.fire(
            'Pieza editada',
            `Pieza editada con éxito`,
            'success'
          )
        },
        err => {
          this.errores = err.error.errors as string[];
          console.log("codigo del error: " + err.status);
          console.log(err.console.error.errors);
        }
      )
    }
  }

  // selecciona una foto para subirla posteriormente

  seleccionarFoto(event:any) {
    this.fotoSeleccionada = event.target.files[0];
    this.isSelected = true;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire({
        icon: 'error',
        title: 'El archivo debe ser del tipo imagen',
        text: 'Error'
      })
      this.fotoSeleccionada = null;
    }
  }

  // sube una foto

  subirFoto(){
    if (!this.fotoSeleccionada) {
      Swal.fire({
        icon: 'error',
        title: 'Debe seleccionar una foto',
        text: 'Error'
      })
    } else {
      this.isSelected = false;
      this.piezaService.subirFoto(this.fotoSeleccionada, this.pieza.id)
        .subscribe(pieza => {
          this.pieza = pieza;
        });
    }
  }

  // compara yacimientos

  compararYacimiento(y1:Yacimiento, y2:Yacimiento):boolean{
    return y1 == null || y2 == null ? false : y1.id === y2.id;
  }

  // compara campañas
  
  compararCampain(c1:Campain, c2:Campain):boolean{
    return c1 == null || c2 == null ? false : c1.id === c2.id;
  }

}
