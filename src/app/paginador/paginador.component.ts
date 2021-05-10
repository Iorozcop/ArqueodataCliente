import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginador-nav',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit {
  @Input() paginador:any;
  @Input() entidad:string;
  paginas:number[];

  constructor() { }

  ngOnInit(): void {
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice)=> indice +1);
  }

}
