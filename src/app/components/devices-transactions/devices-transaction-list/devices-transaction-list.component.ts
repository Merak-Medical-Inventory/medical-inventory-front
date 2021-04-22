import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';
import {DeviceTransaction, DeviceTransactionTable} from '../../../entities/deviceTransaction';
import {DeviceTransactionService} from '../../../services/deviceTransaction/device-transaction.service';
import {Rol} from '../../../entities/rol';
import {User} from '../../../entities/user';
import {roles} from '../../../constants/rolConstants';

@Component({
  selector: 'app-devices-transaction-list',
  templateUrl: './devices-transaction-list.component.html',
  styleUrls: ['./devices-transaction-list.component.css']
})
export class DevicesTransactionListComponent implements OnInit {
  deviceTransactions: DeviceTransaction[] = [];
  deviceTransactionsTable: DeviceTransactionTable[] = [];
  currentPageDeviceTransaction: DeviceTransactionTable[];
  paginatedDeviceTransactions: DeviceTransactionTable[][] = [];
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
  rol: Rol;

  constructor(private service: DeviceTransactionService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('User') );
    this.rol = user.rol;
    if (this.rol.name === roles.admin || this.rol.name === roles.superUser) {
      this.service.getTransactions()
        .subscribe(response => {
          this.deviceTransactions = response.body['data'];
          console.log(this.deviceTransactions);
          this.deviceTransactions = this.deviceTransactions.map(value => {
            const date = new Date(value.date);
            // @ts-ignore
            value.date = `${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`;
            return value;
          });
          this.deviceTransactionsTable = this.deviceTransactions.map(deviceTransaction => {
            const element: DeviceTransactionTable = {
              id: deviceTransaction.id,
              blockchainTx: deviceTransaction.blockchainTx,
              date: deviceTransaction.date,
              bcTransactionId: deviceTransaction.bcTransactionId,
              inventory1: deviceTransaction.inventory1.name,
              inventory2: deviceTransaction.inventory2.name,
              device: deviceTransaction.device.generalDevice.name + ' ' + deviceTransaction.device.serial_code
            };
            return element;
          });
          this.paginatedDeviceTransactions = paginateObject<DeviceTransactionTable>(this.deviceTransactionsTable, this.pageSize);
          this.currentPageDeviceTransaction = this.paginatedDeviceTransactions[0];
          this.isLoading = false;
        }, error => {
          this.isLoading = false;
          console.log(error.error);
          this.alertService.error('Error al Obtener las Transacciones', false);
        });
    }
  }

  checkRole() {
    if (this.rol.name === roles.admin || this.rol.name === roles.superUser) {
      return true;
    }
    return false;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageDeviceTransaction = this.paginatedDeviceTransactions[event.pageIndex];
  }

  searchTyped() {
    this.paginatedDeviceTransactions = paginateObject<DeviceTransactionTable>(filterTable<DeviceTransactionTable>
    (this.deviceTransactionsTable, this.search), this.pageSize);
    this.currentPageDeviceTransaction = this.paginatedDeviceTransactions[0];
  }

}
