import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminAuthGuard} from '../../guards/adminAuth/admin-auth.guard';
import {GeneralItemListComponent} from './general-item-list/general-item-list.component';
import {GeneralItemFormComponent} from './general-item-form/general-item-form.component';


const routes: Routes = [{
  path: '',
  component: GeneralItemListComponent
},
  {
    path: 'add',
    component: GeneralItemFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:generalItemId',
    component: GeneralItemFormComponent,
    canActivate: [AdminAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralItemsRoutingModule { }
