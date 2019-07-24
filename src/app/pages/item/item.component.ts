import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescription } from '../../interfaces/info-item.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  loadDescriptionPro = true;
  Producto: ProductoDescription;
  id: string;
  constructor( private route: ActivatedRoute,
               public productoService: ProductosService  ) { }

  ngOnInit() {
    this.route.params.subscribe( parametros => {
      this.productoService.getProducto( parametros[ 'id' ] )
      .subscribe( ( producto: ProductoDescription )  => {
        this.Producto = producto;
        this.id = parametros[ 'id' ];
        this.loadDescriptionPro = false;
      });
    });
  }

}
