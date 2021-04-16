import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemsOrderComponent} from './items-order/items-order.component';


const routes: Routes = [{
  path: '',
  component: ItemsOrderComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderStatsRoutingModule { }
