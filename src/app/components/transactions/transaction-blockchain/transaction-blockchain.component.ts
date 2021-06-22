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

  constructor(private service: TransactionService, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getBlockchainTransaction(this.transactionTable.bcTransactionId)
      .subscribe(response => {
        this.transaction = response.body['data'];
        const date = new Date(this.transaction.date);
          // @ts-ignore
        this.transactionBcTable = {
          date: `${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`,
          amount: this.transaction.amount,
          sender: this.transaction.sender ? this.transaction.sender.name + ' ' + this.transaction.sender.last_name : '',
          inventory1: this.transaction.inventory1 ? this.transaction.inventory1.name : 'Exterior',
          inventory2: this.transaction.inventory2 ? this.transaction.inventory2.name : 'Exterior',
          item: this.transaction.item.generalItem.name + ' ' +  this.transaction.item.brand.name + ' ' +
            this.transaction.item.presentation.quantity + ' ' + this.transaction.item.presentation.name + ' '
            + this.transaction.item.presentation.measure_value + ' ' + this.transaction.item.presentation.measure,
          blockchainTx : this.transactionTable.blockchainTx
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
