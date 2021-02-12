import { Component, OnInit, Input } from '@angular/core';
import {Device, DeviceTable} from '../../../entities/device';
import {DeviceService} from '../../../services/device/device.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];
  devicesTable: DeviceTable[] = [];
  currentPageDevice: DeviceTable[];
  paginatedDevices: DeviceTable[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;
  months = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre',
  };


  constructor(private service: DeviceService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
      this.service.getDevices()
        .subscribe(response => {
          this.devices = response.body['data'];
          this.devices = this.devices.map(value => {
            const date = new Date(value.date);
            // @ts-ignore
            value.date = `${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`;
            return value;
          });
          this.devices = this.devices.map(value => {
            const date = new Date(value.warranty_date);
            // @ts-ignore
            value.warranty_date = `${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`;
            return value;
          });
          this.devicesTable = this.devices.map(device => {
            const element: DeviceTable = {
              id: device.id,
              serial_code: device.serial_code,
              power_supply: device.power_supply,
              date: device.date,
              warranty_date: device.warranty_date,
              production_year: device.production_year,
              generalDevice: device.generalDevice.name,
              maker: device.maker.name,
              brand: device.brand.name,
              location: device.location.name,
              Record: device.Record,
              Maintenance: device.Maintenance
            };
            return element;
          });
          this.paginatedDevices = paginateObject<DeviceTable>(this.devicesTable, this.pageSize);
          this.currentPageDevice = this.paginatedDevices[0];
          this.isLoading = false;
        }, error => {
          this.isLoading = false;
          console.log(error.error);
          this.alertService.error('Error al Obtener los Equipos Médicos', false);
        });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageDevice = this.paginatedDevices[event.pageIndex];
  }

  searchTyped() {
    this.paginatedDevices = paginateObject<DeviceTable>(filterTable<DeviceTable>(this.devicesTable, this.search), this.pageSize);
    this.currentPageDevice = this.paginatedDevices[0];
  }

  onDelete(id: number) {
    this.alertService.clear();
    Swal.fire({
      title: 'Desea Eliminar el Equipo Médico?',
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
        this.service.deleteDevice(id)
          .subscribe(response => {
            this.isLoading = false;
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Equipo Médico se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            this.alertService.error('Error al Eliminar el Equipo Médico', false);
          });
      }
    });
  }

}
