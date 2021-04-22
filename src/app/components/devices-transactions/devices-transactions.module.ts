import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesTransactionsRoutingModule } from './devices-transactions-routing.module';
import { DevicesTransactionListComponent } from './devices-transaction-list/devices-transaction-list.component';
import {LayoutModule} from '../layout/layout.module';
import {PaginatorModule} from 'primeng/paginator';
import {MatPaginatorModule} from '@angular/material';


@NgModule({
  declarations: [DevicesTransactionListComponent],
  imports: [
    CommonModule,
    DevicesTransactionsRoutingModule,
    LayoutModule,
    PaginatorModule,
    MatPaginatorModule
  ]
})
export class DevicesTransactionsModule { }
