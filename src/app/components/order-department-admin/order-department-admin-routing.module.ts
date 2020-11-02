import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderDepartmentAdminListComponent} from './order-department-admin-list/order-department-admin-list.component';


const routes: Routes = [{
  path: '',
  component: OrderDepartmentAdminListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDepartmentAdminRoutingModule { }

