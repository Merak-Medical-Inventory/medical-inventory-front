import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminAuthGuard} from '../../guards/adminAuth/admin-auth.guard';
import {DeviceListComponent} from './device-list/device-list.component';
import {DeviceFormComponent} from './device-form/device-form.component';

const routes: Routes = [{
  path: '',
  component: DeviceListComponent
},
  {
    path: 'add',
    component: DeviceFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:deviceId',
    component: DeviceFormComponent,
    canActivate: [AdminAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
