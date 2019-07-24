import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemInterface } from '../interfaces/item.interface';
import { reject, resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargandoProductos = true;

  loadFiltro = true;
  filtroNoFound = false;
  productos: ItemInterface[] = [];
  productosFiltrados: ItemInterface[];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise( ( resolve, reject ) => {
      this.http.get( 'https://angular-html-4e3a1.firebaseio.com/productos_idx.json' )
      .subscribe( (resp: ItemInterface[]) => {
        this.productos = resp;
        this.cargandoProductos = false;
        resolve();
      });
    });
  }

  getProducto( id: string ) {
    return this.http.get( `https://angular-html-4e3a1.firebaseio.com/productos/${ id }.json` );
  }
  buscarProducto( termino: string ) {
    if ( this.productos.length === 0 ) {
        this.cargarProductos().then( () => {
          this.filtarProductos( termino );
        });
    } else {
      this.filtarProductos( termino );
    }
  }

  private filtarProductos( termino: string ) {
    this.productosFiltrados = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino) >= 0 ) {
        this.productosFiltrados.push( prod );
      }
    });
    if (this.productosFiltrados.length > 0 ) {
      this.loadFiltro = false;
    } else {
      this.loadFiltro = false;
      this.filtroNoFound = true;
    }
  }
}
