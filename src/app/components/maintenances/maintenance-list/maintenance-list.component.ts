import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';
import {Maintenance, MaintenanceTable} from '../../../entities/maintenance';
import {MaintenanceService} from '../../../services/maintenance/maintenance.service';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {
  maintenances: Maintenance[] = [];
  maintenancesTable: MaintenanceTable[] = [];
  currentPageMaintenance: MaintenanceTable[];
  paginatedMaintenances: MaintenanceTable[][] = [];
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

  constructor(private service: MaintenanceService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getMaintenances()
      .subscribe(response => {
        this.maintenances = response.body['data'];
        console.log(this.maintenances);
        this.maintenances = this.maintenances.map(value => {
          const date = new Date(value.date);
          // @ts-ignore
          value.date = `${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`;
          return value;
        });
        this.maintenancesTable = this.maintenances.map(maintenance => {
          const element: MaintenanceTable = {
            id: maintenance.id,
            device: maintenance.device.generalDevice.name + ' ' + maintenance.device.serial_code,
            date: maintenance.date,
            description: maintenance.description
          };
          return element;
        });
        this.paginatedMaintenances = paginateObject<MaintenanceTable>(this.maintenancesTable, this.pageSize);
        this.currentPageMaintenance = this.paginatedMaintenances[0];
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener los Mantenimientos', false);
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageMaintenance = this.paginatedMaintenances[event.pageIndex];
  }

  searchTyped() {
    this.paginatedMaintenances = paginateObject<MaintenanceTable>(filterTable<MaintenanceTable>
      (this.maintenancesTable, this.search), this.pageSize);
    this.currentPageMaintenance = this.paginatedMaintenances[0];
  }

  onDelete(id: number) {
    this.alertService.clear();
    Swal.fire({
      title: 'Desea Eliminar el Mantenimiento?',
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
        this.service.deleteMaintenance(id)
          .subscribe(response => {
            this.isLoading = false;
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Mantenimiento se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            this.alertService.error('Error al Eliminar el Mantenimiento', false);
          });
      }
    });
  }

}
