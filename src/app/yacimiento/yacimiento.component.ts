import { Component, OnInit } from '@angular/core';
import { Yacimiento } from './yacimiento';
import { YacimientoService } from '../servicios/yacimiento.service';
import Swal from 'sweetalert2'
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-yacimiento',
  templateUrl: './yacimiento.component.html',
  styleUrls: ['./yacimiento.component.css']
})
export class YacimientoComponent implements OnInit {

  constructor(private yacimientoService: YacimientoService,
              public authService: AutenticacionService) { }

  yacimientos:Yacimiento[]=[];
  
  ngOnInit(): void {
      this.yacimientoService.getYacimientos().subscribe(
        yacimientos => this.yacimientos = yacimientos
    );
  }

  delete(yacimiento:Yacimiento):void{
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Vas a eliminar a ${yacimiento.nombre} de la base de datos`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.yacimientoService.delete(yacimiento.id).subscribe(
          response => {
            this.yacimientos = this.yacimientos.filter(yac => yac !== yacimiento)
            Swal.fire(
            '¡Eliminado!',
            'El yacimiento ha sido eliminado',
            'success'
        )
          }
        )
        
      }
    })
  }

}
