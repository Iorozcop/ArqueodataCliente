import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';

import { FooterComponent } from './footer/footer/footer.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { PiezaComponent } from './pieza/pieza.component';
import { PiezasService } from './servicios/piezas.service';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './registro/registro.component'
import { FormsModule } from '@angular/forms';
import { CrearPiezaComponent } from './crear-pieza/crear-pieza.component'

const routes: Routes =[
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'piezas', component: PiezaComponent},
  {path:'usuarios', component: UsuarioComponent},
  {path:'registro', component: RegistroComponent},
  {path:'crear', component: CrearPiezaComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsuarioComponent,
    PiezaComponent,
    LoginComponent,
    RegistroComponent,
    CrearPiezaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PiezasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
