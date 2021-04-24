import { Component, OnInit } from '@angular/core';
import { Campain } from './campain';
import { CampainService } from '../servicios/campain.service';
import Swal from 'sweetalert2'
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-campain',
  templateUrl: './campain.component.html',
  styleUrls: ['./campain.component.css']
})
export class CampainComponent implements OnInit {

  constructor(private campainService: CampainService,
              public authService: AutenticacionService) { }

  campains:Campain[]=[];
  
  ngOnInit(): void {
    this.campainService.getCampains().subscribe(
      campains => this.campains = campains
  );
  }

  delete(campain:Campain):void{
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Vas a eliminar la campaña ${campain.campain} de la base de datos`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.campainService.delete(campain.id).subscribe(
          response => {
            this.campains = this.campains.filter(camp => camp !== campain)
            Swal.fire(
            '¡Eliminado!',
            'La campaña ha sido eliminada',
            'success'
            )}
        )}
    })
  }

}