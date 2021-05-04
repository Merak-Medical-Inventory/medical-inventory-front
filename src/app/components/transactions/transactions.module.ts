import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import {LayoutModule} from '../layout/layout.module';
import {PaginatorModule} from 'primeng/paginator';
import {MatPaginatorModule} from '@angular/material';
import { TransactionBlockchainComponent } from './transaction-blockchain/transaction-blockchain.component';


@NgModule({
  declarations: [TransactionListComponent, TransactionBlockchainComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    LayoutModule,
    PaginatorModule,
    MatPaginatorModule
  ]
})
export class TransactionsModule { }
