import { Component, OnInit } from '@angular/core';
import {Item} from '../../../entities/item';
import {ItemService} from '../../../services/item/item.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  search = '';
  isLoading = true;

  constructor(private service: ItemService, private router: Router) { }

  ngOnInit() {
    this.service.getItems()
      .subscribe(response => {
        this.isLoading = false;
        this.items = response.body['data'];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Obtener los Insumos',
          text: 'Intente más Tarde',
          confirmButtonColor: '#1ab394'
        });
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Desea Eliminar el Insumo?',
      // text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.deleteItem(id)
          .subscribe(response => {
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Insumo se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al Eliminar el Insumo',
              text: 'Intente Nuevamente',
              confirmButtonColor: '#1ab394'
            });
          });
      }
    });
  }

}
