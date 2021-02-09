import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MakerListComponent} from './maker-list/maker-list.component';
import { MakerFormComponent} from './maker-form/maker-form.component';
import {AdminAuthGuard} from '../../guards/adminAuth/admin-auth.guard';


const routes: Routes = [{
  path: '',
  component: MakerListComponent
},
  {
    path: 'add',
    component: MakerFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:makerId',
    component: MakerFormComponent,
    canActivate: [AdminAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakersRoutingModule { }
