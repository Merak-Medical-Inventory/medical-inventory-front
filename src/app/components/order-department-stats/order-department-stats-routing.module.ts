import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartmentsOrderComponent} from './departments-order/departments-order.component';
import {ItemsDepartmentsOrderComponent} from './items-departments-order/items-departments-order.component';


const routes: Routes = [{
  path: '',
  component: DepartmentsOrderComponent
  },
  {
    path: 'items',
    component:  ItemsDepartmentsOrderComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDepartmentStatsRoutingModule { }
