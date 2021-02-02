import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralDevicesRoutingModule } from './general-devices-routing.module';
import { GeneralDeviceListComponent } from './general-device-list/general-device-list.component';
import { GeneralDeviceFormComponent } from './general-device-form/general-device-form.component';
import {LayoutModule} from '../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {GeneralDeviceService} from '../../services/generalDevice/general-device.service';


@NgModule({
  declarations: [GeneralDeviceListComponent, GeneralDeviceFormComponent],
  imports: [
    CommonModule,
    GeneralDevicesRoutingModule,
    MatPaginatorModule,
    LayoutModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  providers: [GeneralDeviceService]
})
export class GeneralDevicesModule { }
