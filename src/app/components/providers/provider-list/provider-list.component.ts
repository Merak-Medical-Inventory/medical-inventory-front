import { Component, OnInit } from '@angular/core';
import {Provider} from '../../../entities/provider';
import {ProviderService} from '../../../services/provider/provider.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
  providers: Provider[] = [];
  search = '';
  isLoading = true;

  constructor(private service: ProviderService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getProviders()
      .subscribe(response => {
        this.isLoading = false;
        this.providers = response.body['data'];
        console.log(response.body['data']);
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener los Proveedores', false);
      });
  }

  showItems(provider: Provider): string {
    let itemsDisplay = '';
    for (const item of provider.items) {
      itemsDisplay = itemsDisplay + item.generalItem.name + ' ' +  item.brand.name + ' ' + item.presentation.quantity + ' '
        + item.presentation.name + ' ' + item.presentation.measure_value + ' ' + item.presentation.measure + ', ';
    }
    itemsDisplay = itemsDisplay.slice(0, -2);
    return itemsDisplay;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onDelete(id: number) {
    this.alertService.clear();
    Swal.fire({
      title: 'Desea Eliminar el Proveedor?',
      // text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        this.service.deleteProvider(id)
          .subscribe(response => {
            this.isLoading = false;
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Proveedor se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            this.alertService.error('Error al Eliminar el Proveedor', false);
          });
      }
    });
  }

}
