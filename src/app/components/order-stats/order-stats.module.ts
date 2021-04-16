import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderStatsRoutingModule } from './order-stats-routing.module';
import { ItemsOrderComponent } from './items-order/items-order.component';
import {MatPaginatorModule, MatTabsModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelect2Module} from 'ng-select2';
import {LayoutModule} from '../layout/layout.module';
import {ChartsModule, ThemeService} from 'ng2-charts';


@NgModule({
  declarations: [ItemsOrderComponent],
  imports: [
    CommonModule,
    OrderStatsRoutingModule,
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
export class OrderStatsModule { }
