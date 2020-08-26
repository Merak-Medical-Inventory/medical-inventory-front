import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProviderListComponent} from './provider-list/provider-list.component';
import {ProviderFormComponent} from './provider-form/provider-form.component';
import {AdminAuthGuard} from '../../guards/adminAuth/admin-auth.guard';


const routes: Routes = [{
  path: '',
  component: ProviderListComponent
},
  {
    path: 'add',
    component: ProviderFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:providerId',
    component: ProviderFormComponent,
    canActivate: [AdminAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
