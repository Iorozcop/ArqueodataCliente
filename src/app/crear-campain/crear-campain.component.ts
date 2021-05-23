import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Campain } from '../campain/campain';
import { CampainService } from '../servicios/campain.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-campain',
  templateUrl: './crear-campain.component.html',
  styleUrls: ['./crear-campain.component.css']
})
export class CrearCampainComponent implements OnInit {

  public campain:Campain= new Campain(); 

  constructor(private campainService: CampainService,
              private router:Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCampain();
  }

  cargarCampain():void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.campainService.getCampain(id).subscribe(
          (campain) => this.campain = campain
        )
      }
    })
  }

  public crear(): void{
    this.campainService.create(this.campain).subscribe(
      response => this.router.navigate(['/piezas/campains'])
    )
  }

  update():void{
    this.campainService.update(this.campain).subscribe(
      campain => {
        this.router.navigate(['/piezas/campains'])
        Swal.fire(
          'Campaña editada',
          `Campaña editada con éxito`,
          'success'
        )
      }
    )
  }

}
