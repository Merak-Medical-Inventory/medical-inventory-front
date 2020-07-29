import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemListComponent} from './item-list/item-list.component';
import {ItemFormComponent} from './item-form/item-form.component';
import {AdminAuthGuard} from '../../guards/adminAuth/admin-auth.guard';


const routes: Routes = [{
  path: '',
  component: ItemListComponent
  },
  {
    path: 'add',
    component: ItemFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:itemId',
    component: ItemFormComponent,
    canActivate: [AdminAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
