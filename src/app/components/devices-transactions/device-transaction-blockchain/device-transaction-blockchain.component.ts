import {Component, Input, OnInit} from '@angular/core';
import {DeviceTransaction, DeviceTransactionTable} from '../../../entities/deviceTransaction';
import {AlertService} from '../../../services/alert/alert.service';
import {DeviceTransactionService} from '../../../services/deviceTransaction/device-transaction.service';

@Component({
  selector: 'app-device-transaction-blockchain',
  templateUrl: './device-transaction-blockchain.component.html',
  styleUrls: ['./device-transaction-blockchain.component.css']
})
export class DeviceTransactionBlockchainComponent implements OnInit {
  @Input() deviceTransactionTable: DeviceTransactionTable;
  deviceTransaction: DeviceTransaction;
  deviceTransactionBcTable: any;
  search = '';
  isLoading = true;
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

  constructor(private service: DeviceTransactionService, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getBlockchainDeviceTransaction(this.deviceTransactionTable.bcTransactionId)
      .subscribe(response => {
        console.log(response);
        this.deviceTransaction = response.body['data'];
        const date = new Date(this.deviceTransaction.date);
        this.deviceTransactionBcTable = {
          date: `${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`,
          sender: this.deviceTransaction.sender ? this.deviceTransaction.sender.name + ' ' + this.deviceTransaction.sender.last_name : '',
          inventory1: this.deviceTransaction.inventory1 ? this.deviceTransaction.inventory1.name : 'Exterior',
          inventory2: this.deviceTransaction.inventory2 ? this.deviceTransaction.inventory2.name : 'Exterior',
          device: this.deviceTransaction.device.generalDevice.name + ' ' + this.deviceTransaction.device.serial_code,
          blockchainTx : this.deviceTransactionTable.blockchainTx
        };
        console.log(this.deviceTransactionBcTable);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener la Transacción por Blockchain', false);
      });
  }

}
