import { Component, OnInit } from '@angular/core';
import {GeneralDevice} from '../../../entities/generalDevice';
import {GeneralDeviceService} from '../../../services/generalDevice/general-device.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {PageEvent} from '@angular/material';
import {filterTable, paginateObject} from '../../../util';

@Component({
  selector: 'app-general-device-list',
  templateUrl: './general-device-list.component.html',
  styleUrls: ['./general-device-list.component.css']
})
export class GeneralDeviceListComponent implements OnInit {
  generalDevices: GeneralDevice[] = [];
  currentPageGeneralDevice: GeneralDevice[];
  paginatedGeneralDevice: GeneralDevice[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;

  constructor(private service: GeneralDeviceService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getGeneralDevices()
      .subscribe(response => {
        this.isLoading = false;
        this.generalDevices = response.body['data'];
        this.paginatedGeneralDevice = paginateObject<GeneralDevice>(this.generalDevices, this.pageSize);
        this.currentPageGeneralDevice = this.paginatedGeneralDevice[0];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener los Equipo Médicos Generales', false);
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageGeneralDevice = this.paginatedGeneralDevice[event.pageIndex];
  }

  searchTyped() {
    this.paginatedGeneralDevice = paginateObject<GeneralDevice>(filterTable<GeneralDevice>(this.generalDevices,
      this.search), this.pageSize);
    this.currentPageGeneralDevice = this.paginatedGeneralDevice[0];
  }

  onDelete(id: number) {
    this.alertService.clear();
    Swal.fire({
      title: 'Desea Eliminar el Equipo Médico General?',
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
        this.service.deleteGeneralDevice(id)
          .subscribe(response => {
            this.isLoading = false;
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Equipo Médico General se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            this.alertService.error('Error al Eliminar el Equipo Médico General', false);
          });
      }
    });
  }

}
