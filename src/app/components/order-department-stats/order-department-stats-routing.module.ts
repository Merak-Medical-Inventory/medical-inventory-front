import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartmentsOrderComponent} from './departments-order/departments-order.component';


const routes: Routes = [{
  path: '',
  component: DepartmentsOrderComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDepartmentStatsRoutingModule { }
