import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceFormComponent } from './device-form/device-form.component';
import {LayoutModule} from '../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {DeviceService} from '../../services/device/device.service';
import {GeneralDeviceService} from '../../services/generalDevice/general-device.service';
import {MakerService} from '../../services/maker/maker.service';
import {BrandService} from '../../services/brand/brand.service';
import {NgSelect2Module} from 'ng-select2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrandsModule} from '../brands/brands.module';
import {BrandFormComponent} from '../brands/brand-form/brand-form.component';
import {GeneralDevicesModule} from '../general-devices/general-devices.module';
import {GeneralDeviceFormComponent} from '../general-devices/general-device-form/general-device-form.component';
import {MakersModule} from '../makers/makers.module';
import {MakerFormComponent} from '../makers/maker-form/maker-form.component';
import {DatePipe} from '@angular/common';
import { LocationHistoryComponent } from './location-history/location-history.component';
import { UpdateLocationComponent } from './update-location/update-location.component';
import {NgxSelectModule} from 'ngx-select-ex';


@NgModule({
  declarations: [DeviceListComponent, DeviceFormComponent, LocationHistoryComponent, UpdateLocationComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    LayoutModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgSelect2Module,
    NgxSelectModule,
    NgbModule,
    BrandsModule,
    GeneralDevicesModule,
    MakersModule
  ],
  providers: [DeviceService, GeneralDeviceService, MakerService, BrandService, DatePipe],
  entryComponents: [GeneralDeviceFormComponent, MakerFormComponent, BrandFormComponent, LocationHistoryComponent, UpdateLocationComponent]
})
export class DevicesModule { }
