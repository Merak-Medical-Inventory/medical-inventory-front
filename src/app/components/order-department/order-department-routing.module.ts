import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderDepartmentListComponent} from './order-department-list/order-department-list.component';
import {OrderDepartmentFormComponent} from './order-department-form/order-department-form.component';
import {MedicalAuthGuard} from '../../guards/medicalAuth/medical-auth.guard';


const routes: Routes = [{
  path: '',
  component: OrderDepartmentListComponent
},
  {
    path: 'add',
    component: OrderDepartmentFormComponent,
    canActivate: [MedicalAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDepartmentRoutingModule { }
