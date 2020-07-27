import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UnauthorizedGuard } from 'src/app/guards/unauthorized/unauthorized.guard';


const routes: Routes = [
  {
    path: '',
    component : UsersListComponent
  },
  {
    path: 'create',
    component: UsersFormComponent,
    canActivate: [UnauthorizedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
