import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDepartmentAdminRoutingModule } from './order-department-admin-routing.module';
import { OrderDepartmentAdminListComponent } from './order-department-admin-list/order-department-admin-list.component';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {LayoutModule} from '../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelect2Module} from 'ng-select2';
import {SelectModule} from 'ng2-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ItemsModule} from '../items/items.module';
import {OrderDepartmentService} from '../../services/orderDepartment/order-department.service';
import {ItemListComponent} from '../items/item-list/item-list.component';


@NgModule({
  declarations: [OrderDepartmentAdminListComponent],
  imports: [
    CommonModule,
    OrderDepartmentAdminRoutingModule,
    MatPaginatorModule,
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
  ],
  providers: [OrderDepartmentService],
  entryComponents: [ItemListComponent]
})
export class OrderDepartmentAdminModule { }
