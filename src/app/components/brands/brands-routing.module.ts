import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnauthorizedGuard} from '../../guards/unauthorized/unauthorized.guard';
import {BrandListComponent} from './brand-list/brand-list.component';
import {BrandFormComponent} from './brand-form/brand-form.component';


const routes: Routes = [{
  path: '',
  component: BrandListComponent
},
  {
    path: 'add',
    component: BrandFormComponent,
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'edit/:brandId',
    component: BrandFormComponent,
    canActivate: [UnauthorizedGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
