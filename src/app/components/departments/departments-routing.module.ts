import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnauthorizedGuard} from '../../guards/unauthorized/unauthorized.guard';
import {DepartmentListComponent} from './department-list/department-list.component';
import {DepartmentFormComponent} from './department-form/department-form.component';


const routes: Routes = [{
  path: '',
  component: DepartmentListComponent
},
  {
    path: 'add',
    component: DepartmentFormComponent,
    canActivate: [UnauthorizedGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
