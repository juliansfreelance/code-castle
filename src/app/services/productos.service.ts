import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemInterface } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: ItemInterface[] = [];
  cargandoProductos = true;
  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get( 'https://angular-html-4e3a1.firebaseio.com/productos_idx.json' )
    .subscribe( (resp: ItemInterface[]) => {
      this.productos = resp;
      this.cargandoProductos = false;
    });
  }
}
