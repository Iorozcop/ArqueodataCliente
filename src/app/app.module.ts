import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';

import { FooterComponent } from './footer/footer/footer.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { PiezaComponent } from './pieza/pieza.component';
import { PiezasService } from './servicios/piezas.service';
import { UsuarioService } from './servicios/usuario.service';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistroComponent } from './registro/registro.component'
import { FormsModule } from '@angular/forms';
import { CrearPiezaComponent } from './crear-pieza/crear-pieza.component';
import { YacimientoComponent } from './yacimiento/yacimiento.component';
import { CampainComponent } from './campain/campain.component';
import { CrearYacimientoComponent } from './crear-yacimiento/crear-yacimiento.component';
import { CrearCampainComponent } from './crear-campain/crear-campain.component'
import { AuthGuard } from './usuario/guards/auth.guard';
import { TokenInterceptor } from './usuario/interceptors/token.interceptor';
import { AuthInterceptor } from './usuario/interceptors/auth.interceptor';
import { CampainService } from './servicios/campain.service';
import { YacimientoService } from './servicios/yacimiento.service';
import { AutenticacionService } from './servicios/autenticacion.service';
import { InicioComponent } from './inicio/inicio.component';
import { DetalleComponent } from './pieza/detalle/detalle.component';
import { FormComponent } from './pieza/busqueda/form/form.component';

import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { PaginadorComponent } from './paginador/paginador.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
registerLocaleData(localeES,'es');


const routes: Routes =[
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path:'inicio', component: InicioComponent, canActivate:[AuthGuard]},
  {path:'login', component: LoginComponent},
  //canActivate:[AuthGuard] comprueba que esté logueado antes de redirigir a la ruta
  {path:'piezas', component: PiezaComponent, canActivate:[AuthGuard]},
  {path:'piezas/page/:page', component: PiezaComponent, canActivate:[AuthGuard]},
  {path:'usuarios', component: UsuarioComponent, canActivate:[AuthGuard]},
  {path:'usuarios/page/:page', component: UsuarioComponent, canActivate:[AuthGuard]},
  {path:'registro', component: RegistroComponent},
  {path:'editar/:id', component: EditarUsuarioComponent, canActivate:[AuthGuard]},
  {path:'registro/:id', component: RegistroComponent, canActivate:[AuthGuard]},
  {path:'crear', component: CrearPiezaComponent, canActivate:[AuthGuard]},
  {path:'crear/:id', component: CrearPiezaComponent, canActivate:[AuthGuard]},
  {path:'piezas/yacimientos', component: YacimientoComponent, canActivate:[AuthGuard]},
  {path:'piezas/yacimientos/page/:page', component: YacimientoComponent, canActivate:[AuthGuard]},
  {path:'piezas/campains', component: CampainComponent, canActivate:[AuthGuard]},
  {path:'piezas/campains/page/:page', component: CampainComponent, canActivate:[AuthGuard]},
  {path:'piezas/crear/yacimiento', component: CrearYacimientoComponent, canActivate:[AuthGuard]},
  {path:'piezas/crear/yacimiento/:id', component: CrearYacimientoComponent, canActivate:[AuthGuard]},
  {path:'piezas/crear/campain', component: CrearCampainComponent, canActivate:[AuthGuard]},
  {path:'piezas/crear/campain/:id', component: CrearCampainComponent, canActivate:[AuthGuard]},
  {path:'piezas/search', component: FormComponent, canActivate:[AuthGuard]},
  {path:'**', component: NotFoundComponent}
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
    YacimientoComponent,
    CampainComponent,
    CrearYacimientoComponent,
    CrearCampainComponent,
    InicioComponent,
    DetalleComponent,
    FormComponent,
    PaginadorComponent,
    NotFoundComponent,
    EditarUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PiezasService,
    UsuarioService,
    CampainService,
    YacimientoService,
    AutenticacionService,
    { provide: LOCALE_ID, useValue: 'es'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
