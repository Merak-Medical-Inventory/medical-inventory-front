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

  constructor(private service: DeviceTransactionService, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getBlockchainDeviceTransaction(this.deviceTransactionTable.bcTransactionId)
      .subscribe(response => {
        console.log(response);
        this.deviceTransaction = response.body['data'];
        console.log(this.deviceTransaction);
        this.deviceTransactionBcTable = {
          date: this.deviceTransaction.date,
          sender: this.deviceTransaction.sender ? this.deviceTransaction.sender.name + ' ' + this.deviceTransaction.sender.last_name : '',
          inventory1: this.deviceTransaction.inventory1 ? this.deviceTransaction.inventory1.name : 'Exterior',
          inventory2: this.deviceTransaction.inventory2 ? this.deviceTransaction.inventory2.name : 'Exterior',
          device: this.deviceTransaction.device.generalDevice.name + ' ' + this.deviceTransaction.device.serial_code
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
