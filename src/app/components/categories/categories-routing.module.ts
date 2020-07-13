import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent} from './category-list/category-list.component';
import {CategoryFormComponent} from './category-form/category-form.component';
import {UnauthorizedGuard} from '../../guards/unauthorized/unauthorized.guard';


const routes: Routes = [{
    path: '',
    component: CategoryListComponent
  },
  {
    path: 'add',
    component: CategoryFormComponent,
    canActivate: [UnauthorizedGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
