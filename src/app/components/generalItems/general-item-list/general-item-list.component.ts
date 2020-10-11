import { Component, OnInit } from '@angular/core';
import {GeneralItem} from '../../../entities/generalItem';
import {GeneralItemService} from '../../../services/generalItem/general-item.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {PageEvent} from '@angular/material';
import {filterTable, paginateObject} from '../../../util';

@Component({
  selector: 'app-general-item-list',
  templateUrl: './general-item-list.component.html',
  styleUrls: ['./general-item-list.component.css']
})
export class GeneralItemListComponent implements OnInit {
  generalItems: GeneralItem[] = [];
  currentPageGeneralItem: GeneralItem[];
  paginatedGeneralItem: GeneralItem[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;

  constructor(private service: GeneralItemService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getGeneralItems()
      .subscribe(response => {
        this.isLoading = false;
        this.generalItems = response.body['data'];
        this.paginatedGeneralItem = paginateObject<GeneralItem>(this.generalItems, this.pageSize);
        this.currentPageGeneralItem = this.paginatedGeneralItem[0];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener los Insumos Generales', false);
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageGeneralItem = this.paginatedGeneralItem[event.pageIndex];
  }

  searchTyped() {
    this.paginatedGeneralItem = paginateObject<GeneralItem>(filterTable<GeneralItem>(this.generalItems, this.search), this.pageSize);
    this.currentPageGeneralItem = this.paginatedGeneralItem[0];
  }

  onDelete(id: number) {
    this.alertService.clear();
    Swal.fire({
      title: 'Desea Eliminar el Insumo General?',
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
        this.service.deleteGeneralItem(id)
          .subscribe(response => {
            this.isLoading = false;
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Insumo General se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            this.alertService.error('Error al Eliminar el Insumo General', false);
          });
      }
    });
  }

}
