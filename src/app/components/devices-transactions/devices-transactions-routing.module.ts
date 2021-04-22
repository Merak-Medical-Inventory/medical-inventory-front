import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DevicesTransactionListComponent} from './devices-transaction-list/devices-transaction-list.component';


const routes: Routes = [{
  path: '',
  component: DevicesTransactionListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesTransactionsRoutingModule { }
