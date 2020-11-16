import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderDepartmentAdminListComponent} from './order-department-admin-list/order-department-admin-list.component';
import {AcceptOrderTableComponent} from './accept-order-table/accept-order-table.component';


const routes: Routes = [{
  path: '',
  component: OrderDepartmentAdminListComponent
},
  {
    path: 'accept/:orderId',
    component: AcceptOrderTableComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDepartmentAdminRoutingModule { }

