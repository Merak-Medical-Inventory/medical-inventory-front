import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import {LayoutModule} from '../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {NgSelect2Module} from 'ng-select2';
import {SelectModule} from 'ng2-select';
import {ProviderService} from '../../services/provider/provider.service';
import {OrderService} from '../../services/order/order.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { LotFormComponent } from './lot-form/lot-form.component';



@NgModule({
  declarations: [OrderListComponent, OrderFormComponent, LotFormComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    LayoutModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgSelect2Module,
    SelectModule,
    NgbModule,
    NgxSelectModule
  ],
  providers: [OrderService, ProviderService],
  entryComponents: [ LotFormComponent ]
})
export class OrdersModule { }
