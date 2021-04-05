import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDepartmentStatsRoutingModule } from './order-department-stats-routing.module';
import { DepartmentsOrderComponent } from './departments-order/departments-order.component';
import {MatPaginatorModule, MatTabsModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelect2Module} from 'ng-select2';
import {LayoutModule} from '../layout/layout.module';
import {ChartsModule, ThemeService} from 'ng2-charts';


@NgModule({
  declarations: [DepartmentsOrderComponent],
  imports: [
    CommonModule,
    OrderDepartmentStatsRoutingModule,
    MatPaginatorModule,
    FormsModule,
    NgSelect2Module,
    ReactiveFormsModule,
    LayoutModule,
    MatTabsModule,
    ChartsModule
  ],
  providers : [ThemeService]
})
export class OrderDepartmentStatsModule { }
