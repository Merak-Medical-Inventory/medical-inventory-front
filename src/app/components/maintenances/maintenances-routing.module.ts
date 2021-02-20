import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminAuthGuard} from '../../guards/adminAuth/admin-auth.guard';
import {MaintenanceFormComponent} from './maintenance-form/maintenance-form.component';
import {MaintenanceListComponent} from './maintenance-list/maintenance-list.component';


const routes: Routes = [{
  path: '',
  component: MaintenanceListComponent
},
  {
    path: 'add',
    component: MaintenanceFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:maintenanceId',
    component: MaintenanceFormComponent,
    canActivate: [AdminAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenancesRoutingModule { }
