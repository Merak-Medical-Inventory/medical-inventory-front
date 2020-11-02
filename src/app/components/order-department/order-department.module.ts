import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDepartmentRoutingModule } from './order-department-routing.module';
import { OrderDepartmentListComponent } from './order-department-list/order-department-list.component';
import { OrderDepartmentFormComponent } from './order-department-form/order-department-form.component';
import {LayoutModule} from '../layout/layout.module';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderDepartmentService} from '../../services/orderDepartment/order-department.service';
import {ItemListComponent} from '../items/item-list/item-list.component';
import {NgSelect2Module} from 'ng-select2';
import {SelectModule} from 'ng2-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ItemsModule} from '../items/items.module';
import {NgxSelectModule} from 'ngx-select-ex';


@NgModule({
  declarations: [OrderDepartmentListComponent, OrderDepartmentFormComponent],
  imports: [
    CommonModule,
    OrderDepartmentRoutingModule,
    LayoutModule,
    MatPaginatorModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgSelect2Module,
    SelectModule,
    NgbModule,
    ItemsModule,
    NgxSelectModule
  ],
  providers: [OrderDepartmentService],
  entryComponents: [ ItemListComponent ]
})
export class OrderDepartmentModule { }
