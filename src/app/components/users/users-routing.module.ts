import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersFormComponent } from './users-form/users-form.component';
import {SuperuserAuthGuard} from '../../guards/superuserAuth/superuser-auth.guard';


const routes: Routes = [
  {
    path: '',
    component : UsersListComponent
  },
  {
    path: 'create',
    component: UsersFormComponent,
    canActivate: [SuperuserAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
