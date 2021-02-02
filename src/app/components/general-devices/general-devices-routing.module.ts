import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminAuthGuard} from '../../guards/adminAuth/admin-auth.guard';
import {GeneralDeviceListComponent} from './general-device-list/general-device-list.component';
import {GeneralDeviceFormComponent} from './general-device-form/general-device-form.component';


const routes: Routes = [{
  path: '',
  component: GeneralDeviceListComponent
},
  {
    path: 'add',
    component: GeneralDeviceFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:generalDeviceId',
    component: GeneralDeviceFormComponent,
    canActivate: [AdminAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralDevicesRoutingModule { }
