import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenancesRoutingModule } from './maintenances-routing.module';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { MaintenanceFormComponent } from './maintenance-form/maintenance-form.component';
import {LayoutModule} from '../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {MaintenanceService} from '../../services/maintenance/maintenance.service';
import {DeviceService} from '../../services/device/device.service';
import {NgSelect2Module} from 'ng-select2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [MaintenanceListComponent, MaintenanceFormComponent],
  imports: [
    CommonModule,
    MaintenancesRoutingModule,
    LayoutModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgSelect2Module,
    NgbModule
  ],
  providers: [MaintenanceService, DeviceService, DatePipe]
})
export class MaintenancesModule { }
