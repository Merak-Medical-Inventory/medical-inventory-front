import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {LayoutModule} from '../layout/layout.module';
import {DepartmentService} from '../../services/department/department.service';


@NgModule({
  declarations: [DepartmentListComponent, DepartmentFormComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    LayoutModule,
    ReactiveFormsModule
  ],
  providers: [DepartmentService]
})
export class DepartmentsModule { }
