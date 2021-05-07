import {Component, Input, OnInit} from '@angular/core';
import {Transaction, TransactionTable} from '../../../entities/transaction';
import {TransactionService} from '../../../services/transaction/transaction.service';
import {AlertService} from '../../../services/alert/alert.service';

@Component({
  selector: 'app-transaction-blockchain',
  templateUrl: './transaction-blockchain.component.html',
  styleUrls: ['./transaction-blockchain.component.css']
})
export class TransactionBlockchainComponent implements OnInit {
  @Input() transactionTable: TransactionTable;
  transaction: Transaction;
  transactionBcTable: any;
  search = '';
  isLoading = true;

  constructor(private service: TransactionService, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getBlockchainTransaction(this.transactionTable.bcTransactionId)
      .subscribe(response => {
        console.log(response);
        this.transaction = response.body['data'];
        console.log(this.transaction);
        this.transactionBcTable = {
          date: this.transaction.date,
          amount: this.transaction.amount,
          sender: this.transaction.sender ? this.transaction.sender.name + ' ' + this.transaction.sender.last_name : '',
          inventory1: this.transaction.inventory1 ? this.transaction.inventory1.name : 'Exterior',
          inventory2: this.transaction.inventory2 ? this.transaction.inventory2.name : 'Exterior',
          item: this.transaction.item.generalItem.name + ' ' +  this.transaction.item.brand.name + ' ' +
            this.transaction.item.presentation.quantity + ' ' + this.transaction.item.presentation.name + ' '
            + this.transaction.item.presentation.measure_value + ' ' + this.transaction.item.presentation.measure
        };
        console.log(this.transactionBcTable);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener la Transacción por Blockchain', false);
      });
  }

}
