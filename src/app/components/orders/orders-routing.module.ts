import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderFormComponent} from './order-form/order-form.component';
import {AdminAuthGuard} from '../../guards/adminAuth/admin-auth.guard';


const routes: Routes = [{
  path: '',
  component: OrderListComponent
},
  {
    path: 'add',
    component: OrderFormComponent,
    canActivate: [AdminAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
