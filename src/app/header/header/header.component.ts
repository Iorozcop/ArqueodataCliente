import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AutenticacionService,
              private router:Router,) { }

  ngOnInit(): void {}

  // Cierra sesión
  logout():void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
