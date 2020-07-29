import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent} from './category-list/category-list.component';
import {CategoryFormComponent} from './category-form/category-form.component';
import {AdminAuthGuard} from '../../guards/adminAuth/admin-auth.guard';


const routes: Routes = [{
    path: '',
    component: CategoryListComponent
  },
  {
    path: 'add',
    component: CategoryFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:categoryId',
    component: CategoryFormComponent,
    canActivate: [AdminAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
