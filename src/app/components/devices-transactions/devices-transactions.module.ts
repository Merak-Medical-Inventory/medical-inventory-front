import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesTransactionsRoutingModule } from './devices-transactions-routing.module';
import { DevicesTransactionListComponent } from './devices-transaction-list/devices-transaction-list.component';
import {LayoutModule} from '../layout/layout.module';
import {PaginatorModule} from 'primeng/paginator';
import {MatPaginatorModule} from '@angular/material';
import { DeviceTransactionBlockchainComponent } from './device-transaction-blockchain/device-transaction-blockchain.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [DevicesTransactionListComponent, DeviceTransactionBlockchainComponent],
  imports: [
    CommonModule,
    DevicesTransactionsRoutingModule,
    LayoutModule,
    PaginatorModule,
    MatPaginatorModule,
    NgbModule
  ],
  entryComponents : [DeviceTransactionBlockchainComponent]
})
export class DevicesTransactionsModule { }
