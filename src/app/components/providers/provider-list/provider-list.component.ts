import { Component, OnInit } from '@angular/core';
import {Provider} from '../../../entities/provider';
import {Item} from '../../../entities/item';
import {ProviderService} from '../../../services/provider/provider.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ItemListComponent} from '../../items/item-list/item-list.component';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
  providers: Provider[] = [];
  currentPageProvider: Provider[];
  paginatedProvider: Provider[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;

  constructor(private service: ProviderService, private router: Router, private alertService: AlertService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.service.getProviders()
      .subscribe(response => {
        this.isLoading = false;
        this.providers = response.body['data'];
        this.paginatedProvider = paginateObject<Provider>(this.providers, this.pageSize);
        this.currentPageProvider = this.paginatedProvider[0];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener los Proveedores', false);
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  showItems(items: Item[]) {
    const modalRef: NgbModalRef = this.modalService.open(ItemListComponent, { centered: true } );
    modalRef.componentInstance.providerItems = items;
    modalRef.componentInstance.isClient = true;
  }

  onPageChanged(event: PageEvent) {
    this.currentPageProvider = this.paginatedProvider[event.pageIndex];
  }

  searchTyped() {
    this.paginatedProvider = paginateObject<Provider>(filterTable<Provider>(this.providers, this.search), this.pageSize);
    this.currentPageProvider = this.paginatedProvider[0];
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
