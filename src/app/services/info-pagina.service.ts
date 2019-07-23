import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  equipo: any[] = [];
  cargandoPersonas = true;

  constructor( private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
   }

   private cargarInfo() {
    this.http.get( 'assets/data/data-pagina.json' )
    .subscribe( (resp: InfoPagina) => {
      this.info = resp;
      this.cargandoPersonas = false;
    });
   }

   private cargarEquipo() {
    this.http.get( 'https://angular-html-4e3a1.firebaseio.com/equipo.json' )
    .subscribe( (resp: any[] ) => {
      this.equipo = resp;
    });
  }
}