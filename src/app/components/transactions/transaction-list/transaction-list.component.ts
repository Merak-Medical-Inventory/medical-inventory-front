import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';
import {Transaction, TransactionTable} from '../../../entities/transaction';
import {TransactionService} from '../../../services/transaction/transaction.service';
import {Rol} from '../../../entities/rol';
import {User} from '../../../entities/user';
import {roles} from '../../../constants/rolConstants';
import {mainInventory} from '../../../constants/inventoryConstans';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ItemListComponent} from '../../items/item-list/item-list.component';
import {TransactionBlockchainComponent} from '../transaction-blockchain/transaction-blockchain.component';
import {OrderService} from '../../../services/order/order.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  transactionsTable: TransactionTable[] = [];
  currentPageTransaction: TransactionTable[];
  paginatedTransactions: TransactionTable[][] = [];
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

  constructor(private service: TransactionService, private router: Router, private alertService: AlertService,
              private modalService: NgbModal) { }

  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('User') );
    this.rol = user.rol;
    if (this.rol.name === roles.superUser) {
      this.service.getTransactions()
        .subscribe(response => {
          this.transactions = response.body['data'];
          console.log(this.transactions);
          this.transactions = this.transactions.map(value => {
            const date = new Date(value.date);
            // @ts-ignore
            value.date = `${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`;
            return value;
          });
          this.transactionsTable = this.transactions.map(transaction => {
            const element: TransactionTable = {
              id: transaction.id,
              blockchainTx: transaction.blockchainTx,
              date: transaction.date,
              bcTransactionId: transaction.bcTransactionId,
              amount: transaction.amount,
              sender: transaction.sender ? transaction.sender.name + ' ' + transaction.sender.last_name : '',
              inventory1: transaction.inventory1 ? transaction.inventory1.name : 'Exterior',
              inventory2: transaction.inventory2 ? transaction.inventory2.name : 'Exterior',
              item: transaction.item.generalItem.name + ' ' +  transaction.item.brand.name + ' ' + transaction.item.presentation.quantity +
                ' ' + transaction.item.presentation.name + ' ' + transaction.item.presentation.measure_value + ' ' +
                transaction.item.presentation.measure
            };
            return element;
          });
          this.paginatedTransactions = paginateObject<TransactionTable>(this.transactionsTable, this.pageSize);
          this.currentPageTransaction = this.paginatedTransactions[0];
          this.isLoading = false;
        }, error => {
          this.isLoading = false;
          console.log(error.error);
          this.alertService.error('Error al Obtener las Transacciones', false);
        });
    } else {
      const inventoryId = this.rol.name === roles.admin ? mainInventory.id : user.department.inventory[0].id;
      this.service.getInventoryTransactions(inventoryId).subscribe(response => {
        this.transactions = response.body['data'];
        console.log(this.transactions);
        this.transactions = this.transactions.map(value => {
          const date = new Date(value.date);
          // @ts-ignore
          value.date = `${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`;
          return value;
        });
        this.transactionsTable = this.transactions.map(transaction => {
          const element: TransactionTable = {
            id: transaction.id,
            blockchainTx: transaction.blockchainTx,
            date: transaction.date,
            bcTransactionId: transaction.bcTransactionId,
            amount: transaction.amount,
            sender: transaction.sender ? transaction.sender.name + ' ' + transaction.sender.last_name : '',
            inventory1: transaction.inventory1 ? transaction.inventory1.name : 'Exterior',
            inventory2: transaction.inventory2 ? transaction.inventory2.name : 'Exterior',
            item: transaction.item.generalItem.name + ' ' +  transaction.item.brand.name + ' ' + transaction.item.presentation.quantity +
              ' ' + transaction.item.presentation.name + ' ' + transaction.item.presentation.measure_value + ' ' +
              transaction.item.presentation.measure
          };
          return element;
        });
        this.paginatedTransactions = paginateObject<TransactionTable>(this.transactionsTable, this.pageSize);
        this.currentPageTransaction = this.paginatedTransactions[0];
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

  showBlockchain(transactionTable: TransactionTable) {
    const modalRef: NgbModalRef = this.modalService.open(TransactionBlockchainComponent, { centered: true } );
    modalRef.componentInstance.transactionTable = transactionTable;
    modalRef.componentInstance.isClient = true;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageTransaction = this.paginatedTransactions[event.pageIndex];
  }

  searchTyped() {
    this.paginatedTransactions = paginateObject<TransactionTable>(filterTable<TransactionTable>
    (this.transactionsTable, this.search), this.pageSize);
    this.currentPageTransaction = this.paginatedTransactions[0];
  }

}
