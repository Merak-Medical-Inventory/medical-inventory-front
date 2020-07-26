import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnauthorizedGuard} from '../../guards/unauthorized/unauthorized.guard';
import {ItemListComponent} from './item-list/item-list.component';
import {ItemFormComponent} from './item-form/item-form.component';


const routes: Routes = [{
  path: '',
  component: ItemListComponent
  },
  {
    path: 'add',
    component: ItemFormComponent,
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'edit/:itemId',
    component: ItemFormComponent,
    canActivate: [UnauthorizedGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
