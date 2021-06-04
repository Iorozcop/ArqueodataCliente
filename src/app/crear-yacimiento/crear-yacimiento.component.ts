import { Component, OnInit } from '@angular/core';
import { Yacimiento } from '../yacimiento/yacimiento';
import { YacimientoService } from '../servicios/yacimiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-yacimiento',
  templateUrl: './crear-yacimiento.component.html',
  styleUrls: ['./crear-yacimiento.component.css']
})
export class CrearYacimientoComponent implements OnInit {

  public yacimiento:Yacimiento= new Yacimiento();
  public errores: string[]; 

  constructor(private yacimientoService: YacimientoService,
              private router:Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarYacimiento();
  }

  // Carga yacimientos
  cargarYacimiento():void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.yacimientoService.getYacimiento(id).subscribe(
          (yacimiento) => this.yacimiento = yacimiento
        )
      }
    })
  }

  // Crea yacimientos
  public crear():void{
    this.yacimientoService.create(this.yacimiento).subscribe(
      response => {this.router.navigate(['/piezas/yacimientos'])
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error("codigo del error: " + err.status);
        console.error(err.console.error.errors);
      }
    )
  }

  // Edita yacimientos
  update():void{
    this.yacimientoService.update(this.yacimiento).subscribe(
      yacimiento => {
        this.router.navigate(['/piezas/yacimientos'])
        Swal.fire(
          'Yacimiento editado',
          `Yacimiento editado con éxito`,
          'success'
        )
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error("codigo del error: " + err.status);
        console.error(err.console.error.errors);
      }
    )
  }
}
