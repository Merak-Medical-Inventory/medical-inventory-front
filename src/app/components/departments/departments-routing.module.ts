import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartmentListComponent} from './department-list/department-list.component';
import {DepartmentFormComponent} from './department-form/department-form.component';
import {SuperuserAuthGuard} from '../../guards/superuserAuth/superuser-auth.guard';


const routes: Routes = [{
  path: '',
  component: DepartmentListComponent
  },
  {
    path: 'add',
    component: DepartmentFormComponent,
    canActivate: [SuperuserAuthGuard]
  },
  {
    path: 'edit/:departmentId',
    component: DepartmentFormComponent,
    canActivate: [SuperuserAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
