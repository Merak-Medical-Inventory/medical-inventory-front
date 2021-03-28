import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgeDevicesStatsRoutingModule } from './age-devices-stats-routing.module';
import { AgeDevicesComponent } from './age-devices.component';
import {LayoutModule} from '../layout/layout.module';
import {PaginatorModule} from 'primeng/paginator';
import {MatPaginatorModule} from '@angular/material';
import {StatsService} from '../../services/stats/stats.service';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelect2Module} from 'ng-select2';


@NgModule({
  declarations: [AgeDevicesComponent],
  imports: [
    CommonModule,
    AgeDevicesStatsRoutingModule,
    LayoutModule,
    PaginatorModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgSelect2Module
  ],
  providers: [StatsService]
})
export class AgeDevicesStatsModule { }
