import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrandListComponent} from './brand-list/brand-list.component';
import {BrandFormComponent} from './brand-form/brand-form.component';
import {AdminAuthGuard} from '../../guards/adminAuth/admin-auth.guard';


const routes: Routes = [{
  path: '',
  component: BrandListComponent
},
  {
    path: 'add',
    component: BrandFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:brandId',
    component: BrandFormComponent,
    canActivate: [AdminAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
